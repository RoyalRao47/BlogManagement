using Microsoft.AspNetCore.Mvc;

namespace BlogMgmtServer.Model
{
    public class BlogCommentModel
    {
        public int CommentID { get; set; }

        public int PostID { get; set; }

        public int UserID { get; set; }  // Nullable for anonymous comments

        public int ParentCommentID { get; set; }  // Nullable for root comments

        public string Content { get; set; }

        public string Status { get; set; } = "Approved";

        public string CreatedAt { get; set; }

        public string UserName { get; set; }

        public int? BlogId { get; set; }
    }
}


