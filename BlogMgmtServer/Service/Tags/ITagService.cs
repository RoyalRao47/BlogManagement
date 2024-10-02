using BlogMgmtServer.DbTable;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public interface ITagService : IDisposable
    {
        
       List<Tag> GetTagList();
       List<Tag> GetActiveTagList();
       Tag GetTagById(int TagId);
       void ChangeTagStatus(int TagId);
       void SaveTag(Tag Tag);
    }
}