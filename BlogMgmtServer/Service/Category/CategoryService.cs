using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.Database;
using BlogMgmtServer.DbTable;

namespace BlogMgmtServer.Service
{
    public class CategoryService : ICategoryService
    {
        private bool disposedValue = false;
        private readonly DataContext _context;

        public CategoryService(DataContext context)
        {
            _context = context;
        }
        public List<Category> GetCategoryList()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }

        public List<Category> GetActiveCategoryList()
        {
            var categories = _context.Categories.Where(x => x.IsActive == true).ToList();
            return categories;
        }

        public Category GetCategoryById(int CategoryId)
        {
            var category = _context.Categories.Find(CategoryId);
            return category;
        }

        public void ChangeCategoryStatus(int CategoryId)
        {
            var category = _context.Categories.Find(CategoryId);
            if (category != null)
            {
                category.IsActive = !category.IsActive;
                category.ModifiedDate = DateTime.Now;
                _context.Entry(category).State = EntityState.Modified;
                _context.SaveChangesAsync();
            }
        }

        public void SaveCategory(Category category)
        {
            if (category.CategoryId > 0)
            {
                var existingCategory = _context.Categories.Find(category.CategoryId);
                if (existingCategory != null)
                {
                    existingCategory.CategoryName = category.CategoryName;
                    existingCategory.IsActive = category.IsActive;
                    existingCategory.ModifiedDate = DateTime.Now;
                    _context.Entry(existingCategory).State = EntityState.Modified;
                    _context.SaveChangesAsync();
                }
            }
            else
            {
                category.CreatedDate = DateTime.Now;
                _context.Categories.Add(category);
                _context.SaveChanges();
            }

        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
        }
    }
}