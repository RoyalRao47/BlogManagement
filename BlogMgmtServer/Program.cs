using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.Database;
using BlogMgmtServer.Service;
using BlogMgmtServer.Model;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection")));

builder.Services.AddHttpClient();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<ITagService, TagService>();
builder.Services.AddTransient<IBlogService, BlogService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAngularApp",
            builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithExposedHeaders("X-Pagination")
                );
    });
builder.Services.Configure<JWTConfiguration>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"], // replace with your issuer
            ValidAudience = builder.Configuration["Jwt:Audience"], // replace with your audience
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)) // replace with your key
        };
    });


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers();
});

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
