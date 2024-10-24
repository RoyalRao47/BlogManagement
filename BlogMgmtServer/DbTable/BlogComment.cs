

namespace BlogMgmtServer.DbTable
{
    public class BlogComment
    {
        public int CommentID { get; set; }

        public int PostID { get; set; }

        public int? UserID { get; set; }  // Nullable for anonymous comments

        public int? ParentCommentID { get; set; }  // Nullable for root comments

        public string Content { get; set; }

        public string Status { get; set; } = "Approved";

        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        public int? BlogId { get; set; }

        public Blog? Blog { get; set; }
        public RegUser? User { get; set; }
        public BlogComment? ParentComment { get; set; }
        public ICollection<BlogComment>? Replies { get; set; }

    }
}


