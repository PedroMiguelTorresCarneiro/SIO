using FluentValidation;
using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Validators
{
    public class Cwe521PasswordValidator : AbstractValidator<RegisterModel>
    {
        public Cwe521PasswordValidator()
        {
            RuleFor(p => p.Password).NotEmpty().WithMessage("Your password cannot be empty");
        }
    }
}
