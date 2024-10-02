using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using BlogMgmtServer.Database;
using BlogMgmtServer.DbTable;
using BlogMgmtServer.Service;
using BlogMgmtServer.Model;

namespace BlogMgmtServer.Service
{
    public class UserService : IUserService
    {
        private bool disposedValue = false;
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }
        public RegUser CheckLoginUser(LoginModel model)
        {
            var user = _context.RegUsers.FirstOrDefault(x => (x.Email.ToLower() == model.Username || x.Username.ToLower() == model.Username) && x.Password == model.Password) ?? null;
            return user;
        }
        public List<RegUser> GetUserList()
        {
            var userList = _context.RegUsers.ToList();
            return userList;
        }

        public RegUser GetUserById(int UserId)
        {
            var userList = GetUserList();
            var user = userList.FirstOrDefault(x => x.UserId == UserId);
            return user;
        }

        public void SaveUser(RegUser user)
        {
            if (user.UserId > 0)
            {
                var existingUser = _context.RegUsers.FirstOrDefault(i => i.UserId == user.UserId);
                if (existingUser != null)
                {
                    existingUser.Username = user.Username;
                    existingUser.Password = user.Password;
                    existingUser.Email = user.Email;
                    existingUser.FullName = user.FullName;
                    _context.Entry(existingUser).State = EntityState.Modified;
                    _context.SaveChangesAsync();
                }
            }
            else
            {
                user.CreatedDate = DateTime.Now;
                _context.RegUsers.Add(user);
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