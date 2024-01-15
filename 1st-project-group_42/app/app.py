from flask import Flask, jsonify, render_template, redirect, request, url_for
import requests
from flask import session

app = Flask(__name__)
api_base_url = 'http://127.0.0.1'  # Replace with the actual base URL of your API

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Prepare the data for the API
        data = {
            'username': username,
            'password': password
        }

        # Send the data to the API to check if the user exists and get the role
        response = requests.post(f'{api_base_url}/Security/login', json=data)

        if response.status_code == 200:
            # If the login is successful, check the role and redirect
            user_data = response.json()
            session['username'] = username
            # The API should return user data including the role.
            # Adjust the following line if the API uses a different key for the role.
            role = user_data.get('role')

            if role == 'admin':
                return redirect(url_for('admin_page'))
            elif role == 'customer':
                return redirect(url_for('customer_page'))
            else:
                # If the role is not recognized, redirect back to login with an error
                return render_template('login.html', error="Invalid role")
        else:
            # If login fails, return to the login page with an error
            return render_template('login.html', error="Login failed")

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Extract the form data
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')

        # Prepare the data for the API
        data = {
            'username': username,
            'email': email,
            'password': password,
            'role': role  # Assuming the API expects a 'role' field
        }

        # Send the data to the API
        response = requests.post(f'{api_base_url}/Security/register', json=data)
        if response.status_code == 200:
            # If the registration is successful, redirect to the corresponding page
            if role == 'admin':
                return redirect(url_for('admin_page'))
            else:
                return redirect(url_for('customer_page'))
        else:
            # If the registration fails, you can return an error message
            return render_template('register.html', error="Registration failed")

    return render_template('register.html')

@app.route('/customer')
def customer_page():
    # You might want to check here if the user is logged in
    return render_template('customer_page.html')

@app.route('/admin')
def admin_page():
    # You might want to check here if the user is an admin
    return render_template('admin_page.html')

@app.route('/inventory')
def inventory():
    response = requests.get(f'{api_base_url}/Inventory/product')
    # Check if the request was successful
    if response.status_code == 200:
        products = response.json()
        return render_template('inventory.html', products=products)
    else:
        # Handle the error appropriately
        print("Failed to fetch products")
        return render_template('inventory.html', error="Failed to load inventory.")


@app.route('/orders')
def orders():
    response = requests.get(f'{api_base_url}/api/shopping/orders')  # Adjust this to your actual API endpoint for all orders
    if response.status_code == 200:
        orders = response.json()
        return render_template('orders.html', orders=orders)
    else:
        print("Failed to fetch orders")
        return render_template('orders.html', error="Failed to load orders.")

@app.route('/profile/<username>')
def profile(username):
    # Fetch user details from the API
    response = requests.get(f'{api_base_url}/api/security/user/{username}')

    if response.status_code == 200:
        user_data = response.json()
        return render_template('profile.html', user=user_data)
    else:
        # Handle the case where the user details could not be fetched
        return render_template('profile.html', error="Could not fetch user details.")

@app.route('/profile/update', methods=['POST'])
def update_profile():
    user_id = request.form.get('id')
    updated_username = request.form.get('username')
    updated_email = request.form.get('email')

    # Construct the data to send in the API request
    data_to_update = {
        'Username': updated_username,
        'Email': updated_email
    }

    # Send the update request to the API
    response = requests.put(f'{api_base_url}/api/security/user/{user_id}', json=data_to_update)

    if response.status_code == 200:
        # If the update is successful, redirect to the profile page with a success message
        return redirect(url_for('profile', username=updated_username, message="Profile updated successfully."))
    else:
        # If the update fails, return to the profile page with an error message
        return render_template('profile.html', error="Failed to update profile.")
    
@app.route('/cart')
def cart():
    # Assume that 'current_username' is obtained after the user logs in
    current_username = session['username']

    # Get the user ID from the API
    user_response = requests.get(f'{api_base_url}/api/security/user/{current_username}')
    if user_response.status_code == 200:
        user = user_response.json()
        user_id = user.get('Id')  # Make sure the key matches the one used by your API
    else:
        # Handle the case where the user ID could not be retrieved
        # This could be due to the user not being found or other API errors
        return "Error retrieving user information", user_response.status_code

    # Now that we have the user ID, we can get the cart items for the user
    cart_response = requests.get(f'{api_base_url}/api/cart/{user_id}')
    if cart_response.status_code == 200:
        cart_items = cart_response.json()  # Adjust based on your API's response structure
        # Add any additional logic for processing cart items if necessary
    else:
        cart_items = []
        # Handle errors or empty cart scenario

    # Render the 'cart.html' template with the cart items
    return render_template('cart.html', cart_items=cart_items)


# Cart Routes
@app.route('/api/cart', methods=['POST'])
def create_cart():
    response = requests.post(f'{api_base_url}/Cart', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/remove_from_cart/<int:product_id>', methods=['POST'])
def remove_from_cart(product_id):
    # Make an API call to remove the product from the cart
    response = requests.delete(f'{api_base_url}/api/cart/{product_id}')
    # Handle the response...
    return redirect(url_for('cart'))

@app.route('/api/cart/<int:id>', methods=['PUT', 'DELETE'])
def modify_cart(id):
    if request.method == 'PUT':
        response = requests.put(f'{api_base_url}/Cart/{id}', json=request.json)
    elif request.method == 'DELETE':
        response = requests.delete(f'{api_base_url}/Cart/{id}')
    return jsonify(response.json()), response.status_code

@app.route('/api/cart/<int:userId>', methods=['GET'])
def get_cart(userId):
    response = requests.get(f'{api_base_url}/Cart/{userId}')
    return jsonify(response.json()), response.status_code

# Inventory Routes
@app.route('/api/inventory/product', methods=['POST', 'GET'])
def product():
    if request.method == 'POST':
        response = requests.post(f'{api_base_url}/Inventory/product', json=request.json)
    else:
        response = requests.get(f'{api_base_url}/Inventory/product')
    return jsonify(response.json()), response.status_code

@app.route('/api/inventory/product/<int:id>', methods=['GET', 'PUT'])
def product_by_id(id):
    if request.method == 'GET':
        response = requests.get(f'{api_base_url}/Inventory/product/{id}')
    else:
        response = requests.put(f'{api_base_url}/Inventory/product/{id}', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/api/inventory/category', methods=['GET', 'POST'])
def category():
    if request.method == 'POST':
        response = requests.post(f'{api_base_url}/Inventory/category', json=request.json)
    else:
        response = requests.get(f'{api_base_url}/Inventory/category')
    return jsonify(response.json()), response.status_code

# Review Routes
@app.route('/api/review', methods=['POST'])
def create_review():
    response = requests.post(f'{api_base_url}/Review', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/api/review/product/<int:productId>', methods=['GET'])
def get_product_reviews(productId):
    response = requests.get(f'{api_base_url}/Review/product/{productId}')
    return jsonify(response.json()), response.status_code

# Security Routes
@app.route('/api/security/register', methods=['POST'])
def register_user():
    response = requests.post(f'{api_base_url}/Security/register', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/api/security/login', methods=['POST'])
def login_user():
    response = requests.post(f'{api_base_url}/Security/login', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/api/security/user/<username>', methods=['GET'])
def get_user(username):
    response = requests.get(f'{api_base_url}/Security/user/{username}')
    return jsonify(response.json()), response.status_code

@app.route('/api/security/user/<int:id>', methods=['PUT'])
def update_user(id):
    response = requests.put(f'{api_base_url}/Security/user/{id}', json=request.json)
    return jsonify(response.json()), response.status_code

# Seed Routes
@app.route('/api/seed', methods=['POST'])
def seed_data():
    response = requests.post(f'{api_base_url}/Seed')
    return jsonify(response.json()), response.status_code

# Shopping Routes
@app.route('/api/shopping/order', methods=['POST'])
def create_order():
    response = requests.post(f'{api_base_url}/Shopping/order', json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/api/shopping/order/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def order_by_id(id):
    if request.method == 'GET':
        response = requests.get(f'{api_base_url}/Shopping/order/{id}')
    elif request.method == 'PUT':
        response = requests.put(f'{api_base_url}/Shopping/order/{id}', json=request.json)
    elif request.method == 'DELETE':
        response = requests.delete(f'{api_base_url}/Shopping/order/{id}')
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
