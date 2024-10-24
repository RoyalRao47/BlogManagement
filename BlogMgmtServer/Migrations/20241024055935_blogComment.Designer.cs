﻿// <auto-generated />
using System;
using BlogMgmtServer.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BlogMgmtServer.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241024055935_blogComment")]
    partial class blogComment
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BlogMgmtServer.DbTable.Blog", b =>
                {
                    b.Property<int>("BlogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BlogId"));

                    b.Property<string>("AuthorName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BlogContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BlogImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("IntroText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsFeature")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BlogId")
                        .HasName("PK_Blog");

                    SqlServerKeyBuilderExtensions.IsClustered(b.HasKey("BlogId"), false);

                    b.HasIndex("UserId");

                    b.ToTable("Blog", (string)null);
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogCategory", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("int");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.HasKey("BlogId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("BlogCategories");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogComment", b =>
                {
                    b.Property<int>("CommentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CommentID"));

                    b.Property<int?>("BlogId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ParentCommentID")
                        .HasColumnType("int");

                    b.Property<int>("PostID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("CommentID")
                        .HasName("PK_BlogComment");

                    SqlServerKeyBuilderExtensions.IsClustered(b.HasKey("CommentID"), false);

                    b.HasIndex("BlogId");

                    b.HasIndex("ParentCommentID");

                    b.HasIndex("UserID");

                    b.ToTable("BlogComment", (string)null);
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogTag", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("int");

                    b.Property<int?>("TagId")
                        .HasColumnType("int");

                    b.HasKey("BlogId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("BlogTags");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("CategoryId")
                        .HasName("PK_Category");

                    SqlServerKeyBuilderExtensions.IsClustered(b.HasKey("CategoryId"), false);

                    b.ToTable("Category", (string)null);
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.RegUser", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId")
                        .HasName("PK_RegUser");

                    SqlServerKeyBuilderExtensions.IsClustered(b.HasKey("UserId"), false);

                    b.ToTable("RegUser", (string)null);
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TagId"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Slug")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TagId")
                        .HasName("PK_Tag");

                    SqlServerKeyBuilderExtensions.IsClustered(b.HasKey("TagId"), false);

                    b.ToTable("Tag", (string)null);
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Blog", b =>
                {
                    b.HasOne("BlogMgmtServer.DbTable.RegUser", "User")
                        .WithMany("Blogs")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogCategory", b =>
                {
                    b.HasOne("BlogMgmtServer.DbTable.Blog", "Blogs")
                        .WithMany("BlogCategories")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlogMgmtServer.DbTable.Category", "Categories")
                        .WithMany("BlogCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Blogs");

                    b.Navigation("Categories");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogComment", b =>
                {
                    b.HasOne("BlogMgmtServer.DbTable.Blog", "Blog")
                        .WithMany()
                        .HasForeignKey("BlogId");

                    b.HasOne("BlogMgmtServer.DbTable.BlogComment", "ParentComment")
                        .WithMany("Replies")
                        .HasForeignKey("ParentCommentID");

                    b.HasOne("BlogMgmtServer.DbTable.RegUser", "User")
                        .WithMany()
                        .HasForeignKey("UserID");

                    b.Navigation("Blog");

                    b.Navigation("ParentComment");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogTag", b =>
                {
                    b.HasOne("BlogMgmtServer.DbTable.Blog", "Blogs")
                        .WithMany("BlogTags")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlogMgmtServer.DbTable.Tag", "Tags")
                        .WithMany("BlogTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Blogs");

                    b.Navigation("Tags");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Blog", b =>
                {
                    b.Navigation("BlogCategories");

                    b.Navigation("BlogTags");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.BlogComment", b =>
                {
                    b.Navigation("Replies");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Category", b =>
                {
                    b.Navigation("BlogCategories");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.RegUser", b =>
                {
                    b.Navigation("Blogs");
                });

            modelBuilder.Entity("BlogMgmtServer.DbTable.Tag", b =>
                {
                    b.Navigation("BlogTags");
                });
#pragma warning restore 612, 618
        }
    }
}