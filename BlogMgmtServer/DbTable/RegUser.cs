namespace BlogMgmtServer.DbTable
{
    public class RegUser
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public string? FullName { get; set; }
        public DateTime? CreatedDate { get; set; }

        public ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    }
}