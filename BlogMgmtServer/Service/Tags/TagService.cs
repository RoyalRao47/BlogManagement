using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.Database;
using BlogMgmtServer.DbTable;

namespace BlogMgmtServer.Service
{
    public class TagService : ITagService
    {
        private bool disposedValue = false;
        private readonly DataContext _context;

        public TagService(DataContext context)
        {
            _context = context;
        }
        public List<Tag> GetTagList()
        {
            var tags = _context.Tags.ToList();
            return tags;
        }

        public List<Tag> GetActiveTagList()
        {
            var tags = _context.Tags.Where(x => x.IsActive == true).ToList();
            return tags;
        }

        public Tag GetTagById(int TagId)
        {
            var tag = _context.Tags.Find(TagId);
            return tag;
        }

        public void ChangeTagStatus(int TagId)
        {
            var tag = _context.Tags.Find(TagId);
            if (tag != null)
            {
                tag.IsActive = !tag.IsActive;
                tag.ModifiedDate = DateTime.Now;
                _context.Entry(tag).State = EntityState.Modified;
                _context.SaveChangesAsync();
            }
        }

        public void SaveTag(Tag tag)
        {
            if (tag.TagId > 0)
            {
                var existingTag = _context.Tags.Find(tag.TagId);
                if (existingTag != null)
                {
                    existingTag.TagName = tag.TagName;
                    existingTag.Slug = tag.Slug;
                    existingTag.IsActive = tag.IsActive;
                    existingTag.ModifiedDate = DateTime.Now;
                    _context.Entry(existingTag).State = EntityState.Modified;
                    _context.SaveChangesAsync();
                }
            }
            else
            {
                tag.CreatedDate = DateTime.Now;
                _context.Tags.Add(tag);
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