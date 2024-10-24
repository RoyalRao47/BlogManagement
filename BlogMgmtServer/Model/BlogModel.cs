using Microsoft.AspNetCore.Mvc;

namespace BlogMgmtServer.Model
{
    public class BlogModel
    {
        //{"blogId":0,"title":"fsdf","introText":"sdfadsf","blogContent":"sdfasdf","isFeature":"true",
        //"categoryId":"1","status":"1","tagId":[1,2],"isActive":true,"File":{},"createdBy":"1"}
        public int? BlogId { get; set; }

        public string? Title { get; set; } = null!;

        public string? IntroText { get; set; }

        public string? BlogContent { get; set; } = null!;

        public string? BlogImage { get; set; }

        public string? Status { get; set; }

        public bool? IsFeature { get; set; }

        public bool? IsActive { get; set; }

        public int? CreatedBy { get; set; }

        public int? CategoryId { get; set; }

        [BindProperty(Name = "TagId")]
        public int[]? TagId { get; set; }

        public IFormFile? File { get; set; }

        public string? Featured { get; set; }

        public string? Active { get; set; }

        public string? CategoryName { get; set; }

        public string[]? TagName { get; set; }

        public string? CreatedDate { get; set; }
        public string? CreatedByName { get; set; }

        public string? IsNew { get; set; }

        public int? CommentCount { get; set; }

    }
}