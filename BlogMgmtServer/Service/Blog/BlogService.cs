using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.Database;
using BlogMgmtServer.Model;
using BlogMgmtServer.DbTable;
using System;
using Microsoft.AspNetCore.Hosting;

namespace BlogMgmtServer.Service
{
    public class BlogService : IBlogService
    {
        private bool disposedValue = false;
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;

        public BlogService(DataContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _env = hostingEnvironment;
        }
        public List<BlogModel> GetBlogList()
        {
            var bloglist = _context.Blogs.Include(c => c.BlogCategories).ThenInclude(bc => bc.Categories).Include(t => t.BlogTags).ThenInclude(bc => bc.Tags).ToList();
            List<BlogModel> blogDtoList = new List<BlogModel>();
            foreach (var blog in bloglist)
            {
                BlogModel _blog = new BlogModel();
                _blog.BlogId = blog.BlogId;
                _blog.Title = blog.Title;
                _blog.IntroText = blog.IntroText;
                _blog.BlogContent = blog.BlogContent;
                _blog.BlogImage = "http://localhost:5015" + blog.BlogImage;
                _blog.Status = blog.Status == "1" ? "Published" : blog.Status == "2" ? "Draft" : blog.Status == "3" ? "Archived" : "";
                _blog.Featured = blog?.IsFeature == true ? "Yes" : "No"; ;
                _blog.Active = blog?.IsActive == true ? "Yes" : "No";
                _blog.CategoryName = blog.BlogCategories.FirstOrDefault().Categories.CategoryName ?? "";
                _blog.TagName = blog.BlogTags.Select(x => x.Tags.TagName).ToArray();
                blogDtoList.Add(_blog);
            }
            return blogDtoList;
        }

        public List<BlogModel> GetActiveBlogList()
        {
            var bloglist = _context.Blogs.Include(c => c.BlogCategories).Include(t => t.BlogTags).Where(x => x.IsActive == true).ToList();
            List<BlogModel> blogDtoList = new List<BlogModel>();
            foreach (var blog in bloglist)
            {
                string imagePath = Path.Combine(_env.WebRootPath, $"{blog.BlogImage}");
                BlogModel _blog = new BlogModel();
                _blog.BlogId = blog.BlogId;
                _blog.Title = blog.Title;
                _blog.IntroText = blog.IntroText;
                _blog.BlogContent = blog.BlogContent;
                _blog.BlogImage = "http://localhost:5015" + blog.BlogImage;
                _blog.Status = blog.Status;
                _blog.IsFeature = blog.IsFeature;
                _blog.IsActive = blog.IsActive;
                _blog.CategoryId = blog.BlogCategories.FirstOrDefault().CategoryId ?? 0;
                _blog.TagId = blog.BlogTags.Select(x => x.TagId ?? 0).ToArray();
                blogDtoList.Add(_blog);
            }
            return blogDtoList;
        }

        public BlogModel GetBlogById(int blogId)
        {
            BlogModel _blog = new BlogModel();
             var blog = _context.Blogs.Include(c => c.BlogCategories).Include(t => t.BlogTags).FirstOrDefault(x => x.BlogId == blogId);
            if (blog != null)
            {
                string imagePath = Path.Combine(_env.WebRootPath, $"{blog.BlogImage}");
                _blog.BlogId = blog.BlogId;
                _blog.Title = blog.Title;
                _blog.IntroText = blog.IntroText;
                _blog.BlogContent = blog.BlogContent;
                _blog.BlogImage = "http://localhost:5015" + blog.BlogImage;
                _blog.Status = blog.Status;
                _blog.IsFeature = blog.IsFeature;
                _blog.IsActive = blog.IsActive;
                _blog.CategoryId = blog.BlogCategories.FirstOrDefault().CategoryId ?? 0;
                _blog.TagId = blog.BlogTags.Select(x => x.TagId ?? 0).ToArray();
            }
            return _blog;
        }

        public void ChangeBlogStatus(int BlogId)
        {
            var Blog = _context.Blogs.Find(BlogId);
            if (Blog != null)
            {
                Blog.IsActive = !Blog.IsActive;
                Blog.ModifiedDate = DateTime.Now;
                _context.Entry(Blog).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        public void SaveBlog(BlogModel BlogDto)
        {

            if (BlogDto.BlogId > 0)
            {
                var existingBlog = _context.Blogs.Find(BlogDto.BlogId);
                if (existingBlog != null)
                {
                    if (BlogDto.File != null && BlogDto.File.Length > 0)
                    {
                        existingBlog.BlogImage = saveFileToFolder(BlogDto);
                    }
                    existingBlog.ModifiedDate = DateTime.Now;
                    existingBlog.Title = BlogDto.Title;
                    existingBlog.IntroText = BlogDto.IntroText;
                    existingBlog.BlogContent = BlogDto.BlogContent;
                    existingBlog.Status = BlogDto.Status;
                    existingBlog.IsFeature = BlogDto.IsFeature;
                    existingBlog.IsActive = BlogDto.IsActive;

                    _context.Entry(existingBlog).State = EntityState.Modified;
                    _context.SaveChanges();

                    var existingBlogCategory = _context.BlogCategories.FirstOrDefault(c => c.BlogId == BlogDto.BlogId);
                    if (existingBlogCategory == null)
                    {
                        var blogCategory = new BlogCategory
                        {
                            BlogId = BlogDto.BlogId ?? 0,
                            CategoryId = BlogDto.CategoryId,
                        };

                        _context.BlogCategories.Add(blogCategory);
                        _context.SaveChanges();
                    }
                    else
                    {
                        if (existingBlogCategory?.CategoryId != BlogDto.CategoryId)
                        {
                            _context.BlogCategories.Remove(existingBlogCategory);
                            _context.SaveChanges();

                            var blogCategory = new BlogCategory
                            {
                                BlogId = BlogDto.BlogId ?? 0,
                                CategoryId = BlogDto.CategoryId,
                            };

                            _context.BlogCategories.Add(blogCategory);
                            _context.SaveChanges();

                        }

                    }

                    var existingBlogTag = _context.BlogTags.FirstOrDefault(c => c.BlogId == BlogDto.BlogId);
                    if (existingBlogTag == null)
                    {
                        foreach (int tagId in BlogDto.TagId)
                        {
                            var blogTag = new BlogTag
                            {
                                BlogId = BlogDto.BlogId ?? 0,
                                TagId = tagId,
                            };

                            _context.BlogTags.Add(blogTag);
                            _context.SaveChanges();
                        }
                    }
                    else
                    {
                        var existingTag = _context.BlogTags.Where(c => c.BlogId == BlogDto.BlogId).ToList();
                        if (existingTag.Any())
                        {
                            _context.BlogTags.RemoveRange(existingTag);
                            _context.SaveChanges();
                        }
                        foreach (int tagId in BlogDto.TagId)
                        {
                            var blogTag = new BlogTag
                            {
                                BlogId = BlogDto.BlogId ?? 0,
                                TagId = tagId,
                            };

                            _context.BlogTags.Add(blogTag);
                            _context.SaveChanges();

                        }

                    }

                }
            }
            else
            {
                Blog blog = new Blog();
                if (BlogDto.File != null && BlogDto.File.Length > 0)
                {
                    blog.BlogImage = saveFileToFolder(BlogDto);
                }
                blog.Title = BlogDto.Title;
                blog.IntroText = BlogDto.IntroText;
                blog.BlogContent = BlogDto.BlogContent;
                blog.Status = BlogDto.Status;
                blog.IsFeature = BlogDto.IsFeature;
                blog.IsActive = BlogDto.IsActive;
                blog.CreatedDate = DateTime.Now;
                blog.CreatedBy = BlogDto.CreatedBy ?? 0;

                _context.Blogs.Add(blog);
                _context.SaveChanges();

                var blogId = blog.BlogId;

                var blogCategory = new BlogCategory
                {
                    BlogId = blogId,
                    CategoryId = BlogDto.CategoryId,
                };

                _context.BlogCategories.Add(blogCategory);
                _context.SaveChanges();

                foreach (int tagId in BlogDto.TagId)
                {
                    var blogTag = new BlogTag
                    {
                        BlogId = blogId,
                        TagId = tagId,
                    };

                    _context.BlogTags.Add(blogTag);
                    _context.SaveChanges();
                }

            }
        }

        private string saveFileToFolder(BlogModel model)
        {
            string path = string.Empty;
            string filename = string.Empty;
            string imagePath = "Content/Blog/";
            if (model.File != null && model.File.Length > 0)
            {
                filename = model.File.FileName;
                string directoryPath = Path.Combine(_env.WebRootPath, $"{imagePath}");
                string filepath = directoryPath + "\\" + filename;

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                if (System.IO.File.Exists(filepath))
                {
                    filename = Path.GetFileNameWithoutExtension(filepath) + "_" + DateTime.UtcNow.ToString("HHmmss") + Path.GetExtension(filepath);
                    filepath = directoryPath + "\\" + filename;
                }
                using (FileStream fs = System.IO.File.Create(filepath))
                {
                    model.File.CopyTo(fs);
                    fs.Flush();
                }
            }
            return "/" + imagePath + "/" + filename;
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