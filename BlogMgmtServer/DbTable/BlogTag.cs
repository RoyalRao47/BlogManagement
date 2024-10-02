namespace BlogMgmtServer.DbTable
{
    public class BlogTag
    {
        public int BlogId { get; set; }
        public int? TagId { get; set; }

        public Blog? Blogs { get; set; }
        public Tag? Tags { get; set; }
    }
}