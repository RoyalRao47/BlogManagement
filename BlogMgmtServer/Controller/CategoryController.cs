using BlogMgmtServer.Database;
using Microsoft.AspNetCore.Mvc;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;

namespace BlogMgmtServer.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICategoryService _categoryService;

        public CategoryController(DataContext context, ICategoryService categoryService)
        {
            _context = context;
            _categoryService = categoryService;
        }

        [HttpPost("SaveCategory")]
        public IActionResult SaveCategory([FromBody] Category category)
        {
            try
            {
                _categoryService.SaveCategory(category);
                return Ok(new { status = true, message = "Category Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCategoryById")]
        public ActionResult<Category> GetCategoryById(int categoryId)
        {
            return _categoryService.GetCategoryById(categoryId);
        }

        [HttpGet("GetAllCategory")]
        public ActionResult<IEnumerable<Category>> GetAllCategory()
        {
            return _categoryService.GetCategoryList();
        }

        [HttpGet("GetActiveCategory")]
        public ActionResult<IEnumerable<Category>> GetActiveCategory()
        {
            return _categoryService.GetActiveCategoryList();
        }

        [HttpPost("ChangeCategoryStatus")]
        public IActionResult ChangeCategoryStatus(int categoryId)
        {
            try
            {
                _categoryService.ChangeCategoryStatus(categoryId);
                return Ok(new { status = true, message = "ThankYou" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}