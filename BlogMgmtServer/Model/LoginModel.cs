
namespace BlogMgmtServer.Model
{
    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
    public class JWTConfiguration
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Secret { get; set; }
    }
}