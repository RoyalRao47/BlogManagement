using BlogMgmtServer.Database;
using Microsoft.AspNetCore.Mvc;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;

        public UserController(DataContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public ActionResult<IEnumerable<RegUser>> GetAllUsers()
        {
            return _userService.GetUserList();
        }
        [HttpGet("GetUserById")]
        public ActionResult<RegUser> GetUserById(int userId)
        {
            return _userService.GetUserById(userId);
        }

        [HttpPost("SaveUser")]
        public IActionResult SaveUser(RegUser user)
        {
            try
            {
                _userService.SaveUser(user);
                return Ok(new { status = true, message = "ThankYou" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        

    }
}