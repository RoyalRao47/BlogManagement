using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.Database;
using BlogMgmtServer.Model;
using BlogMgmtServer.DbTable;
using System;
using Microsoft.AspNetCore.Hosting;
using BlogMgmtServer.Migrations;
using Microsoft.AspNetCore.Http.Features;
using System.Text.Json;
using Newtonsoft.Json;

namespace BlogMgmtServer.Service
{
    public class ApiBlogService : IApiBlogService
    {
        private bool disposedValue = false;
        private readonly HttpClient _httpClient;

        public ApiBlogService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://dev.to/api/");
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "RaoBlog/1.0");
            // _httpClient.DefaultRequestHeaders.Add("api-key", "zRdHqvKGq9yGyPM4nT7MVbhV");
        }
        public async Task<List<BlogModel>> GetApiBlog(string tag = "", int perPage = 10, int page = 1)
        {
            try
            {
                var url = $"articles";
                // string username = "raoamit47";
                // // Construct query parameters
                // var url = $"articles?per_page={perPage}&page={page}";

                //     url += $"&username={username}";

                if (!string.IsNullOrEmpty(tag))
                {
                    url += $"?tag={tag}";
                }

                // Make the GET request to Dev.to API
                var response = await _httpClient.GetAsync(url);

                // Ensure the response was successful
                response.EnsureSuccessStatusCode();

                // Deserialize the response content into a list of articles
                var content = await response.Content.ReadAsStringAsync();
                List<ApiBlogModel> blogList = System.Text.Json.JsonSerializer.Deserialize<List<ApiBlogModel>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                List<BlogModel> blogDtoList = new List<BlogModel>();
                foreach (var blog in blogList)
                {
                    BlogModel _blog = new BlogModel();
                    _blog.BlogId = blog.id;
                    _blog.Title = blog.title;
                    _blog.IntroText = blog.description;
                    _blog.BlogContent = blog.description;
                    _blog.BlogImage = blog.cover_image != null ? blog.cover_image : blog.user.profile_image;

                    _blog.Featured = "Featured";
                    _blog.Active = "Active";
                    _blog.CategoryName = null;
                    _blog.TagName = blog.tag_list?.Select(x => x).ToArray();
                    _blog.CreatedDate = blog.created_at.ToShortDateString();
                    _blog.CreatedByName = blog.user.name;
                    _blog.IsNew = (DateTime.Now.Date - blog.created_at.Date).TotalDays < 2 ? "New" : null;
                    _blog.CommentCount = blog.public_reactions_count;
                    _blog.TotalCount = 30;
                    blogDtoList.Add(_blog);
                }
                return blogDtoList.OrderByDescending(x => x.BlogId).ToList();
            }
            catch (Exception ex)
            {
                // Handle errors here (log them, rethrow them, etc.)
                throw new Exception("Error fetching articles from Dev.to", ex);
            }
        }

        public async Task<BlogModel> GetApiBlogById(int blogId)
        {
            BlogModel _blog = new BlogModel();
            var url = $"articles/" + blogId;
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            ApiBlogModel blog = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiBlogModel>(content);
            if (blog != null)
            {
                _blog.BlogId = blog.id;
                _blog.Title = blog.title;
                _blog.IntroText = blog.description;
                _blog.BlogContent = blog.body_html;
                _blog.BlogImage = blog.cover_image != null ? blog.cover_image : blog.user.profile_image;
                _blog.Featured = "Featured";
                _blog.Active = "Active";
                _blog.CategoryName = null;
                _blog.TagName = blog.tag_list?.Select(x => x).ToArray();
                _blog.CreatedDate = blog.created_at.ToShortDateString();
                _blog.CreatedByName = blog.user.name;
                _blog.IsNew = (DateTime.Now.Date - blog.created_at.Date).TotalDays < 2 ? "New" : null;
                _blog.CommentCount = blog.public_reactions_count;
                _blog.TotalCount = 30;

            }
            return _blog;
        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    //_context.Dispose();
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