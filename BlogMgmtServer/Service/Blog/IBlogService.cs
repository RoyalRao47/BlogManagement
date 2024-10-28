using BlogMgmtServer.DbTable;
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
       List<BlogModel> GetAllBlogByUserId(int UserId);
       void SaveBlogComment(BlogComment comment);
       List<BlogCommentModel> GetBlogCommentById(int BlogId);
       List<BlogModel> GetRelatedBlogList(int BlogId, int CategoryId);
       Task<List<BlogModel>> GetPagedBlogList(PaginationModel parameters);
    }
}