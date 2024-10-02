

namespace BlogMgmtServer.DbTable
{
    public class Blog
    {
        public int BlogId { get; set; }

        public string Title { get; set; } = null!;

        public string? IntroText { get; set; }

        public string BlogContent { get; set; } = null!;

        public string? BlogImage { get; set; }

        public string? AuthorName { get; set; }

        public string? Status { get; set; }

        public bool? IsFeature { get; set; }

        public bool? IsActive { get; set; }

        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public RegUser? User { get; set; }
        public ICollection<BlogCategory>? BlogCategories { get; set; }
        public ICollection<BlogTag>? BlogTags { get; set; }

    }
}