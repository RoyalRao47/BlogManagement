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

        [HttpGet("GetBlogById")]
        public ActionResult<BlogModel> GetBlogById(int BlogId)
        {
            return _BlogService.GetBlogById(BlogId);
        }

        [HttpGet("GetAllBlog")]
        public ActionResult<IEnumerable<BlogModel>> GetAllBlog()
        {
            return _BlogService.GetBlogList();
        }

        [HttpGet("GetAllBlogByUserId")]
        public ActionResult<IEnumerable<BlogModel>> GetAllBlogByUserId(int UserId)
        {
            return _BlogService.GetAllBlogByUserId(UserId);
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

        [HttpGet("GetBlogDetailById")]
        public ActionResult<BlogModel> GetBlogDetailById(int BlogId)
        {
            return _BlogService.GetBlogDetailById(BlogId);
        }

        [HttpPost("SaveBlogComment")]
        public IActionResult SaveBlogComment([FromBody] BlogComment blogComment)
        {
            try
            {
                _BlogService.SaveBlogComment(blogComment);
                return Ok(new { status = true, message = "Blog Comment Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetBlogCommentById")]
        public ActionResult<IEnumerable<BlogCommentModel>> GetBlogCommentById(int BlogId)
        {
            return _BlogService.GetBlogCommentById(BlogId);
        }

        [HttpGet("GetRelatedBlog")]
        public ActionResult<IEnumerable<BlogModel>> GetRelatedBlog(int BlogId, int CategoryId)
        {
            return _BlogService.GetRelatedBlogList(BlogId, CategoryId);
        }

        [HttpGet("GetPagedBlogList")]
        public async Task<ActionResult<IEnumerable<BlogModel>>> GetPagedBlogList([FromQuery] PaginationModel parameters)
        {
            var items = await _BlogService.GetPagedBlogList(parameters);
            int count = items.FirstOrDefault().TotalCount ?? 0;
            var metadata = new
            {
                TotalCount = count,
                PageSize = parameters.PageSize,
                CurrentPage = parameters.PageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)parameters.PageSize)
            };

            Response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(items);
        }

    }
}