
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public interface IApiBlogService : IDisposable
    {
        Task<List<BlogModel>> GetApiBlog(string tag = null, int perPage = 10, int page = 1);
        Task<BlogModel> GetApiBlogById(int blogId);

        Task<List<BlogModel>> GetFavApiBlog(int userId);
        void SaveFavApiBlog(FavApiBlog favApiBlog);
    }
}