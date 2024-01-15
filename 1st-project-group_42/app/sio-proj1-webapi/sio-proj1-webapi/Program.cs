using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Middleware;
using sio_proj1_webapi.Services;
using sio_proj1_webapi.Services.Interfaces;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IInventoryService, Cwe89InventoryService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IShoppingService, ShoppingService>();
builder.Services.AddScoped<IUserService, Cwe256UserService>();
builder.Services.AddScoped<ISeedService, SeedService>();
builder.Services.AddDbContext<sioproj1Context>(options => options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(sioproj1Context))));


////builder.Services.AddAntiforgery(options =>
////{
////    options.HeaderName = "X-XSRF-TOKEN";
////    options.SuppressXFrameOptionsHeader = false;
////});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
////app.UseMiddleware<AntiXssMiddleware>();
app.MapControllers();
app.Run();
