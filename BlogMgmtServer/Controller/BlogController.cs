using BlogMgmtServer.Database;
using Microsoft.AspNetCore.Mvc;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IBlogService _BlogService;

        public BlogController(DataContext context, IBlogService BlogService)
        {
            _context = context;
            _BlogService = BlogService;
        }

        [HttpPost("SaveBlog")]
        public IActionResult SaveBlog([FromForm] BlogModel Blog)
        {
            try
            {
                _BlogService.SaveBlog(Blog);
                return Ok(new { status = true, message = "Blog Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // [HttpGet("GetBlogById")]
        // public ActionResult<BlogModel> GetBlogById(int BlogId)
        // {
        //     return _BlogService.GetBlogById(BlogId);
        // }

        [HttpGet("GetAllBlog")]
        public ActionResult<IEnumerable<BlogModel>> GetAllBlog()
        {
            return _BlogService.GetBlogList();
        }

        [HttpGet("GetActiveBlog")]
        public ActionResult<IEnumerable<BlogModel>> GetActiveBlog()
        {
            return _BlogService.GetActiveBlogList();
        }

        [HttpPost("ChangeBlogStatus")]
        public IActionResult ChangeBlogStatus(int BlogId)
        {
            try
            {
                _BlogService.ChangeBlogStatus(BlogId);
                return Ok(new { status = true, message = "ThankYou" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}