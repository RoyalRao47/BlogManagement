namespace BlogMgmtServer.DbTable
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = null!;

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool? IsActive { get; set; }

        public ICollection<BlogCategory>? BlogCategories { get; set; }
    }
}