namespace BlogMgmtServer.DbTable
{
    public class Tag
    {
        public int TagId { get; set; }

        public string TagName { get; set; } = null!;

        public string? Slug { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool? IsActive { get; set; }
        
        public ICollection<BlogTag> BlogTags { get; set; } = new List<BlogTag>();
    }
}