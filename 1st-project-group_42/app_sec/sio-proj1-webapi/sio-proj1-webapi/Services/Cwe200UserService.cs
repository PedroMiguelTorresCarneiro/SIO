using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Services
{
    public class Cwe200UserService : IUserService
    {
        private readonly sioproj1Context _context;
        private readonly string _pepper;
        private readonly int _iteration = 3;

        public Cwe200UserService(sioproj1Context context)
        {
            _context = context;
            _pepper = Environment.GetEnvironmentVariable("PasswordHashExamplePepper") ?? "SomeRandomPepper";
        }

        public async Task<UserModel> Register(RegisterModel resource, CancellationToken cancellationToken = default)
        {
            var user = new User
            {
                Username = resource.Username,
                PasswordSalt = PasswordHasher.GenerateSalt(),
                UserRole = Enums.UserRole.customer
            };
            user.PasswordHash = PasswordHasher.ComputeHash(resource.Password, user.PasswordSalt, _pepper, _iteration);
            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new UserModel(user.UserId, user.Username, string.Empty);
        }

        public async Task<UserModel> Login(LoginModel resource, CancellationToken cancellationToken = default)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Username == resource.Username, cancellationToken);

            if (user == null)
                throw new Exception("Login Fail - Unknown Username.");
           
            var passwordHash = PasswordHasher.ComputeHash(resource.Password, user.PasswordSalt, _pepper, _iteration);
            if (user.PasswordHash != passwordHash)
                throw new Exception("Login Fail - Password Incorrect.");

            return new UserModel(user.UserId, user.Username, string.Empty);
        }

        public Task<UserModel> ResetPassword(int userId, string newPassword)
        {
            throw new NotImplementedException();
        }

        public async Task<UserModel> GetUserByUsernameAsync(string username, CancellationToken cancellationToken = default)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username) ?? throw new Exception("Not found");

            return new UserModel(user.UserId, user.Username, string.Empty);
        }

        public async Task<UserModel> UpdateUserAsync(UserModel userModel, CancellationToken cancellationToken = default)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userModel.Id) ?? throw new Exception("Not found");

            user.UserRole = (Enums.UserRole)userModel.ProfileId;
            await _context.SaveChangesAsync();

            return userModel;
        }
    }
}
