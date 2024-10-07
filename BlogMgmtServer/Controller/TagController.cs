using BlogMgmtServer.Database;
using Microsoft.AspNetCore.Mvc;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITagService _TagService;

        public TagController(DataContext context, ITagService TagService)
        {
            _context = context;
            _TagService = TagService;
        }

        [HttpPost("SaveTag")]
        public IActionResult SaveTag([FromBody] Tag Tag)
        {
            try
            {
                _TagService.SaveTag(Tag);
                return Ok(new { status = true, message = "Tag Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetTagById")]
        public ActionResult<Tag> GetTagById(int TagId)
        {
            return _TagService.GetTagById(TagId);
        }

        [HttpGet("GetAllTag")]
        public ActionResult<IEnumerable<Tag>> GetAllTag()
        {
            return _TagService.GetTagList();
        }

        [HttpGet("GetActiveTag")]
        public ActionResult<IEnumerable<Tag>> GetActiveTag()
        {
            return _TagService.GetActiveTagList();
        }

        [HttpPost("ChangeTagStatus")]
        public IActionResult ChangeTagStatus(int TagId)
        {
            try
            {
                _TagService.ChangeTagStatus(TagId);
                return Ok(new { status = true, message = "ThankYou" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}