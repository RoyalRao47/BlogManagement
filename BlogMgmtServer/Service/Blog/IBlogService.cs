using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public interface IBlogService : IDisposable
    {
        
       List<BlogModel> GetBlogList();
       List<BlogModel> GetActiveBlogList();
       BlogModel GetBlogById(int BlogId);
       void ChangeBlogStatus(int BlogId);
       void SaveBlog(BlogModel Blog);
       BlogModel GetBlogDetailById(int BlogId);
    }
}