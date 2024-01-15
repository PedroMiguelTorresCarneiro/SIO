# 1st-project-group_42
1st-project-group_42 created by GitHub Classroom

# - DETI SHOP -
This repository contains a Flask application that integrates with a backend e-commerce API (dotNet) to manage user profiles, inventory, shopping carts, and orders.
---

# FLASK APP

## Prerequisites
```
    pip install flask
    pip install -r requirements.txt
```

## SET UP THE ENVIROMENT
```
    python -m venv venv
```
#### - WINDOWS -
```
    venv\Scripts\activate
```
#### - macOs and Linux -
```
    source venv/bin/activate
```
## RUN APP
#### - WINDOWS -
```
    set FLASK_APP=app.py
    flask run
```
#### - macOs and Linux -
```    
    export FLASK_APP=app.py,
    flask run
```

# BACKend API (dotnet)
.NET API, PostgreSQL, Docker

## RUN DOCKER
Go to:
 * app/sio-proj1-webapi or app_sec/sio-proj1-webapi
```
docker-compose  -f "docker-compose.yml" -f "docker-compose.override.yml" -p dockercompose14017794313282009554 --ansi never up
```

### SEED DATA INTO DB
```
curl -X 'POST' \
  'http://localhost:8000/api/Seed' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "createDb": true
```

---

## Vulnerabilities
* CWE-20: Improper Imput Validation
* CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')
* CWE-89: Improper Neutralization of Special Elements used in na SQL Command ('SQL Injection')
* CWE-200: Information Exposure
* CWE-256: PlainText Storage of a Password
* CWE-521: Weak Password Requirements
* CWE-601: URL Redirection to Untrusted Site ('Open Redirect')

## Authors
- [40115] Ruben Marinho
- [73775] Pedro Carneiro
- [73882] Inês Águia
- [80709] Filipe Posio
