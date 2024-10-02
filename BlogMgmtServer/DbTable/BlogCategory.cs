namespace BlogMgmtServer.DbTable
{
    public class BlogCategory
{
    public int BlogId { get; set; }
    public int? CategoryId { get; set; }

    public Blog? Blogs { get; set; }
    public Category? Categories { get; set; }
}
}