USE [master]
GO
/****** Object:  Database [BlogMgmt]    Script Date: 24-10-2024 16:54:39 ******/
CREATE DATABASE [BlogMgmt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BlogMgmt', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\BlogMgmt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BlogMgmt_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\BlogMgmt_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BlogMgmt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BlogMgmt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BlogMgmt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BlogMgmt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BlogMgmt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BlogMgmt] SET ARITHABORT OFF 
GO
ALTER DATABASE [BlogMgmt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BlogMgmt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BlogMgmt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BlogMgmt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BlogMgmt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BlogMgmt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BlogMgmt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BlogMgmt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BlogMgmt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BlogMgmt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BlogMgmt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BlogMgmt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BlogMgmt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BlogMgmt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BlogMgmt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BlogMgmt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BlogMgmt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BlogMgmt] SET RECOVERY FULL 
GO
ALTER DATABASE [BlogMgmt] SET  MULTI_USER 
GO
ALTER DATABASE [BlogMgmt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BlogMgmt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BlogMgmt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BlogMgmt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BlogMgmt] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BlogMgmt', N'ON'
GO
ALTER DATABASE [BlogMgmt] SET QUERY_STORE = OFF
GO
USE [BlogMgmt]
GO
ALTER DATABASE SCOPED CONFIGURATION SET ACCELERATED_PLAN_FORCING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_ADAPTIVE_JOINS = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_MEMORY_GRANT_FEEDBACK = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_ON_ROWSTORE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET DEFERRED_COMPILATION_TV = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_ONLINE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_RESUMABLE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET GLOBAL_TEMPORARY_TABLE_AUTO_DROP = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET INTERLEAVED_EXECUTION_TVF = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ISOLATE_SECURITY_POLICY_CARDINALITY = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LIGHTWEIGHT_QUERY_PROFILING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET OPTIMIZE_FOR_AD_HOC_WORKLOADS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ROW_MODE_MEMORY_GRANT_FEEDBACK = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET TSQL_SCALAR_UDF_INLINING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET VERBOSE_TRUNCATION_WARNINGS = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_PROCEDURE_EXECUTION_STATISTICS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_QUERY_EXECUTION_STATISTICS = OFF;
GO
USE [BlogMgmt]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Blog]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blog](
	[BlogId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[IntroText] [nvarchar](max) NULL,
	[BlogContent] [nvarchar](max) NOT NULL,
	[BlogImage] [nvarchar](max) NULL,
	[AuthorName] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[IsFeature] [bit] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[ModifiedDate] [datetime2](7) NULL,
	[UserId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BlogCategories]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlogCategories](
	[BlogId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
 CONSTRAINT [PK_BlogCategories] PRIMARY KEY CLUSTERED 
(
	[BlogId] ASC,
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BlogComment]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlogComment](
	[CommentID] [int] IDENTITY(1,1) NOT NULL,
	[PostID] [int] NOT NULL,
	[UserID] [int] NULL,
	[ParentCommentID] [int] NULL,
	[Content] [nvarchar](max) NOT NULL,
	[Status] [nvarchar](max) NOT NULL,
	[CreatedAt] [datetime2](7) NULL,
	[BlogId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BlogTags]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlogTags](
	[BlogId] [int] NOT NULL,
	[TagId] [int] NOT NULL,
 CONSTRAINT [PK_BlogTags] PRIMARY KEY CLUSTERED 
(
	[BlogId] ASC,
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[ModifiedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RegUser]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RegUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[FullName] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag]    Script Date: 24-10-2024 16:54:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[TagId] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](max) NOT NULL,
	[Slug] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[ModifiedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241001092111_InitialCreate', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241024055935_blogComment', N'8.0.8')
SET IDENTITY_INSERT [dbo].[Blog] ON 

INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (8, N'What is Lorem Ipsum By Amit Kumar Yadav', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', N'/Content/Blog/1705466307452_103042.JPEG', NULL, N'2', 1, 1, 1, CAST(N'2024-10-05T16:00:42.3048924' AS DateTime2), CAST(N'2024-10-22T18:25:50.5136786' AS DateTime2), 1)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (9, N'Where does it come from?', N'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', N'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Fin bus Bono rum et Malo rum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit met..", comes from a line in section 1.10.32.', N'/Content/Blog/1698034433422.JPEG', NULL, N'3', 1, 1, 1, CAST(N'2024-10-05T16:05:43.6100405' AS DateTime2), CAST(N'2024-10-22T18:25:52.3491713' AS DateTime2), 1)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (11, N'What makes the best blogging platform?', N'Our best apps roundups are written by humans who''ve spent much of their careers using, testing, and writing about software. Unless explicitly stated, we spend dozens of hours researching and testing apps, using each app as it''s intended to be used and evaluating it against the criteria we set for the category', N'Blogs have been around since the earliest days of the internet, so most people have a pretty solid idea of what one is—even if they''ve never really thought to spell it out. Here''s how I think about it: a blog is a website, maybe with a few other pages, but the most important part is the feed of blog posts in reverse chronological order. 

There''s a thin line between the software you need to create a blog and the kind of content management systems (CMS) used by large companies to power their websites. Many tools like WordPress and Drupal can be used to both build a blog or power a regular website (or do both at once).', N'/Content/Blog//1723544621298.JPEG', NULL, N'1', 1, 1, 2, CAST(N'2024-10-23T16:56:47.4206346' AS DateTime2), NULL, 2)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (10, N'Why do we use it?', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humor and the like).', N'/Content/Blog//1703257006756.JPEG', NULL, N'2', 0, 1, 1, CAST(N'2024-10-05T16:33:07.9335952' AS DateTime2), CAST(N'2024-10-07T18:52:24.9643878' AS DateTime2), 1)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (12, N'Digital Ipsum By Heera Takur', N'The decade that brought us Star Trek and Doctor Who also resurrected Cicero—or at least what used to be Cicero—in an attempt to make the days before computerized design a little less painstaking.', N'The French lettering company Letterset manufactured a set of dry-transfer sheets which included the lorem ipsum filler text in a variety of fonts, sizes, and layouts. These sheets of lettering could be rubbed on anywhere and were quickly adopted by graphic artists, printers, architects, and advertisers for their professional look and ease of use.

Aldus Corporation, which later merged with Adobe Systems, ushered lorem ipsum into the information age with its desktop publishing software Aldus PageMaker. The program came bundled with lorem ipsum dummy text for laying out page content, and other word processors like Microsoft Word followed suit. More recently the growth of web design has helped proliferate lorem ipsum across the internet as a placeholder for future text—and in some cases the final content (this is why we proofread, kids).', N'/Content/Blog//OIG.50a3rPuRB5DaGvXUIR5R.jpg', NULL, N'1', 1, 1, 2, CAST(N'2024-10-24T16:30:19.8447830' AS DateTime2), NULL, 2)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (13, N'Form Over Function By Fufa ji', N'So when is it okay to use lorem ipsum? First, lorem ipsum works well for staging. It''s like the props in a furniture store—filler text makes it look like someone is home. ', N'So when is it okay to use lorem ipsum? First, lorem ipsum works well for staging. It''s like the props in a furniture store—filler text makes it look like someone is home. The same Wordpress template might eventually be home to a fitness blog, a photography website, or the online journal of a cupcake fanatic. Lorem ipsum helps them imagine what the lived-in website might look like.

Second, use lorem ipsum if you think the placeholder text will be too distracting. For specific projects, collaboration between copywriters and designers may be best, however, like Karen McGrane said, draft copy has a way of turning any meeting about layout decisions into a discussion about word choice. So don''t be afraid to use lorem ipsum to keep everyone focused.', N'/Content/Blog//OIG.XDmNHzzJc2HmBQ8c3ufq.jpg', NULL, N'3', 1, 1, 2, CAST(N'2024-10-24T16:31:31.7787626' AS DateTime2), NULL, 2)
SET IDENTITY_INSERT [dbo].[Blog] OFF
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (8, 1)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (9, 2)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (10, 3)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (13, 3)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (11, 4)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (12, 4)
SET IDENTITY_INSERT [dbo].[BlogComment] ON 

INSERT [dbo].[BlogComment] ([CommentID], [PostID], [UserID], [ParentCommentID], [Content], [Status], [CreatedAt], [BlogId]) VALUES (3, 11, 1, NULL, N'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself', N'Approved', CAST(N'2024-10-24T14:29:27.6481488' AS DateTime2), 11)
INSERT [dbo].[BlogComment] ([CommentID], [PostID], [UserID], [ParentCommentID], [Content], [Status], [CreatedAt], [BlogId]) VALUES (4, 11, 1, NULL, N'because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure', N'Approved', CAST(N'2024-10-24T14:30:02.1299818' AS DateTime2), 11)
INSERT [dbo].[BlogComment] ([CommentID], [PostID], [UserID], [ParentCommentID], [Content], [Status], [CreatedAt], [BlogId]) VALUES (5, 11, 2, NULL, N'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill', N'Approved', CAST(N'2024-10-24T14:49:17.1159004' AS DateTime2), 11)
INSERT [dbo].[BlogComment] ([CommentID], [PostID], [UserID], [ParentCommentID], [Content], [Status], [CreatedAt], [BlogId]) VALUES (6, 10, 2, NULL, N'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain', N'Approved', CAST(N'2024-10-24T15:20:31.9487389' AS DateTime2), 10)
SET IDENTITY_INSERT [dbo].[BlogComment] OFF
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (8, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (9, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (12, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (8, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (9, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (11, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (13, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 3)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (11, 3)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (12, 3)
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (1, N'Travel', CAST(N'2024-10-02T15:55:20.1793927' AS DateTime2), CAST(N'2024-10-02T16:30:49.3017968' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (2, N'Fashion', CAST(N'2024-10-02T16:13:57.4416112' AS DateTime2), CAST(N'2024-10-02T16:30:50.1017385' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (3, N'Fitness', CAST(N'2024-10-02T16:14:04.9201861' AS DateTime2), CAST(N'2024-10-02T16:30:44.5411575' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (4, N'Blogging', CAST(N'2024-10-02T16:14:20.3765050' AS DateTime2), CAST(N'2024-10-02T16:30:51.0299470' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[RegUser] ON 

INSERT [dbo].[RegUser] ([UserId], [Username], [Password], [Email], [FullName], [CreatedDate]) VALUES (1, N'Amit', N'Admin@123', N'amit@dotsquares.com', N'Amit Yadav', CAST(N'2024-10-02T10:31:20.6433333' AS DateTime2))
INSERT [dbo].[RegUser] ([UserId], [Username], [Password], [Email], [FullName], [CreatedDate]) VALUES (2, N'Ambe', N'Admin@123', N'Ambe@gmail.com', N'Amberaj Singh', CAST(N'2024-10-23T16:38:58.1509427' AS DateTime2))
SET IDENTITY_INSERT [dbo].[RegUser] OFF
SET IDENTITY_INSERT [dbo].[Tag] ON 

INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (1, N'Art', NULL, CAST(N'2024-10-03T11:58:03.5437114' AS DateTime2), NULL, 1)
INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (2, N'Health', N'what-is-a-slug', CAST(N'2024-10-03T11:59:07.2856167' AS DateTime2), CAST(N'2024-10-03T12:00:28.5498200' AS DateTime2), 1)
INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (3, N' Humor', N'lorem-ipsum-is-simply', CAST(N'2024-10-03T12:00:19.4209661' AS DateTime2), CAST(N'2024-10-23T16:02:57.2274730' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Tag] OFF
/****** Object:  Index [PK_Blog]    Script Date: 24-10-2024 16:54:40 ******/
ALTER TABLE [dbo].[Blog] ADD  CONSTRAINT [PK_Blog] PRIMARY KEY NONCLUSTERED 
(
	[BlogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Blog_UserId]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_Blog_UserId] ON [dbo].[Blog]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogCategories_CategoryId]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_BlogCategories_CategoryId] ON [dbo].[BlogCategories]
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_BlogComment]    Script Date: 24-10-2024 16:54:40 ******/
ALTER TABLE [dbo].[BlogComment] ADD  CONSTRAINT [PK_BlogComment] PRIMARY KEY NONCLUSTERED 
(
	[CommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogComment_BlogId]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_BlogComment_BlogId] ON [dbo].[BlogComment]
(
	[BlogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogComment_ParentCommentID]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_BlogComment_ParentCommentID] ON [dbo].[BlogComment]
(
	[ParentCommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogComment_UserID]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_BlogComment_UserID] ON [dbo].[BlogComment]
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogTags_TagId]    Script Date: 24-10-2024 16:54:40 ******/
CREATE NONCLUSTERED INDEX [IX_BlogTags_TagId] ON [dbo].[BlogTags]
(
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_Category]    Script Date: 24-10-2024 16:54:40 ******/
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [PK_Category] PRIMARY KEY NONCLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_RegUser]    Script Date: 24-10-2024 16:54:40 ******/
ALTER TABLE [dbo].[RegUser] ADD  CONSTRAINT [PK_RegUser] PRIMARY KEY NONCLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_Tag]    Script Date: 24-10-2024 16:54:40 ******/
ALTER TABLE [dbo].[Tag] ADD  CONSTRAINT [PK_Tag] PRIMARY KEY NONCLUSTERED 
(
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Blog]  WITH CHECK ADD  CONSTRAINT [FK_Blog_RegUser_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[RegUser] ([UserId])
GO
ALTER TABLE [dbo].[Blog] CHECK CONSTRAINT [FK_Blog_RegUser_UserId]
GO
ALTER TABLE [dbo].[BlogCategories]  WITH CHECK ADD  CONSTRAINT [FK_BlogCategories_Blog_BlogId] FOREIGN KEY([BlogId])
REFERENCES [dbo].[Blog] ([BlogId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BlogCategories] CHECK CONSTRAINT [FK_BlogCategories_Blog_BlogId]
GO
ALTER TABLE [dbo].[BlogCategories]  WITH CHECK ADD  CONSTRAINT [FK_BlogCategories_Category_CategoryId] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BlogCategories] CHECK CONSTRAINT [FK_BlogCategories_Category_CategoryId]
GO
ALTER TABLE [dbo].[BlogComment]  WITH CHECK ADD  CONSTRAINT [FK_BlogComment_Blog_BlogId] FOREIGN KEY([BlogId])
REFERENCES [dbo].[Blog] ([BlogId])
GO
ALTER TABLE [dbo].[BlogComment] CHECK CONSTRAINT [FK_BlogComment_Blog_BlogId]
GO
ALTER TABLE [dbo].[BlogComment]  WITH CHECK ADD  CONSTRAINT [FK_BlogComment_BlogComment_ParentCommentID] FOREIGN KEY([ParentCommentID])
REFERENCES [dbo].[BlogComment] ([CommentID])
GO
ALTER TABLE [dbo].[BlogComment] CHECK CONSTRAINT [FK_BlogComment_BlogComment_ParentCommentID]
GO
ALTER TABLE [dbo].[BlogComment]  WITH CHECK ADD  CONSTRAINT [FK_BlogComment_RegUser_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[RegUser] ([UserId])
GO
ALTER TABLE [dbo].[BlogComment] CHECK CONSTRAINT [FK_BlogComment_RegUser_UserID]
GO
ALTER TABLE [dbo].[BlogTags]  WITH CHECK ADD  CONSTRAINT [FK_BlogTags_Blog_BlogId] FOREIGN KEY([BlogId])
REFERENCES [dbo].[Blog] ([BlogId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BlogTags] CHECK CONSTRAINT [FK_BlogTags_Blog_BlogId]
GO
ALTER TABLE [dbo].[BlogTags]  WITH CHECK ADD  CONSTRAINT [FK_BlogTags_Tag_TagId] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tag] ([TagId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BlogTags] CHECK CONSTRAINT [FK_BlogTags_Tag_TagId]
GO
USE [master]
GO
ALTER DATABASE [BlogMgmt] SET  READ_WRITE 
GO
