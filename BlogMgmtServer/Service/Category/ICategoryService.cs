using BlogMgmtServer.DbTable;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public interface ICategoryService : IDisposable
    {
        
       List<Category> GetCategoryList();
       List<Category> GetActiveCategoryList();
       Category GetCategoryById(int CategoryId);
       void ChangeCategoryStatus(int CategoryId);
       void SaveCategory(Category category);
    }
}