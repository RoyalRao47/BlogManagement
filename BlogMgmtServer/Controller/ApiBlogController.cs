using BlogMgmtServer.Database;
using Microsoft.AspNetCore.Mvc;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;
using BlogMgmtServer.Model;
using BlogMgmtServer.Migrations;
using Newtonsoft.Json;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ApiBlogController : ControllerBase
    {
        private readonly IApiBlogService _apiBlogService;

        public ApiBlogController(IApiBlogService ApiBlogService)
        {
            _apiBlogService = ApiBlogService;
        }

        [HttpGet("GetApiBlog")]
        public async Task<ActionResult<List<BlogModel>>> GetApiBlog(string tag = null, int perPage = 10, int page = 1)
        {
            var articles = await _apiBlogService.GetApiBlog(tag, perPage, page);
            return Ok(articles);
        }

        [HttpGet("GetApiBlogById")]
        public async Task<ActionResult<BlogModel>> GetApiBlogById(int BlogId)
        {
            var articles = await _apiBlogService.GetApiBlogById(BlogId);
            return Ok(articles);
        }

        [HttpPost("SaveFavApiBlog")]
        public IActionResult SaveFavApiBlog([FromBody] FavApiBlog favApiBlog)
        {
            try
            {
                _apiBlogService.SaveFavApiBlog(favApiBlog);
                return Ok(new { status = true, message = "Fav Blog Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetFavApiBlog")]
        public async Task<ActionResult<List<BlogModel>>> GetFavApiBlog(int userId)
        {
           var articles =  await _apiBlogService.GetFavApiBlog(userId);
           return Ok(articles);
        }

    }
}