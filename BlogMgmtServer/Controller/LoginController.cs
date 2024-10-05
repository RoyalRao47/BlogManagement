using BlogMgmtServer.Database;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Model;
using BlogMgmtServer.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;


        public LoginController(DataContext context, IConfiguration configuration, IUserService userService, HttpClient httpClient)
        {
            _context = context;
            _configuration = configuration;
            _userService = userService;
            _httpClient = httpClient;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _userService.CheckLoginUser(login);
            if (user != null)
            {
                var tokenString = GenerateJWTToken(user);
                return Ok(new { status = true , userId = user.UserId, Token = tokenString });
            }

            return Ok(new { status = false, message = "Chala Ja B..K" });
        }

        private string GenerateJWTToken(RegUser user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]);
            var issuer = _configuration["Jwt:Issuer"].ToString();
            var audience = _configuration["Jwt:Audience"].ToString();
            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
