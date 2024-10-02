using Microsoft.EntityFrameworkCore;
using BlogMgmtServer.DbTable;


namespace BlogMgmtServer.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
 : base(options)
        {
        }


        public DbSet<RegUser> RegUsers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<BlogCategory> BlogCategories { get; set; }
        public DbSet<BlogTag> BlogTags { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=192.168.1.13;Database=BlogMgmt;User=usr_journeycrm;Password=usr_journeycrm#123;TrustServerCertificate=True;TrustServerCertificate=true;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RegUser>(entity =>
            {
                entity.ToTable("RegUser");
                entity.HasKey(e => e.UserId)
                      .HasName("PK_RegUser")
                      .IsClustered(false);
                entity.Property(e => e.UserId)
                      .ValueGeneratedOnAdd(); // Identity column configuration
            });

            modelBuilder.Entity<Blog>(entity =>
                        {
                            entity.ToTable("Blog");
                            entity.HasKey(e => e.BlogId)
                                  .HasName("PK_Blog")
                                  .IsClustered(false);
                            entity.Property(e => e.BlogId)
                                  .ValueGeneratedOnAdd(); // Identity column configuration
                        });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");
                entity.HasKey(e => e.CategoryId)
                      .HasName("PK_Category")
                      .IsClustered(false);
                entity.Property(e => e.CategoryId)
                      .ValueGeneratedOnAdd(); // Identity column configuration
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tag");
                entity.HasKey(e => e.TagId)
                      .HasName("PK_Tag")
                      .IsClustered(false);
                entity.Property(e => e.TagId)
                      .ValueGeneratedOnAdd(); // Identity column configuration
            });

            // Configure Many-to-Many relationships
            modelBuilder.Entity<BlogCategory>()
                .HasKey(pc => new { pc.BlogId, pc.CategoryId });

            modelBuilder.Entity<BlogTag>()
                .HasKey(pt => new { pt.BlogId, pt.TagId });

        }

    }
}