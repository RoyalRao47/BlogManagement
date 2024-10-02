using BlogMgmtServer.DbTable;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public interface IUserService : IDisposable
    {
        RegUser CheckLoginUser(LoginModel model);
        List<RegUser> GetUserList();
        RegUser GetUserById(int UserId);
        void SaveUser(RegUser user);
       
    }
}