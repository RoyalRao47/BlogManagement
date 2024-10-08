USE [master]
GO
/****** Object:  Database [BlogMgmt]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[Blog]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[BlogCategories]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[BlogTags]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[Category]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[RegUser]    Script Date: 07-10-2024 16:25:25 ******/
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
/****** Object:  Table [dbo].[Tag]    Script Date: 07-10-2024 16:25:25 ******/
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
SET IDENTITY_INSERT [dbo].[Blog] ON 

INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (8, N'What is Lorem Ipsum By Amit Kumar Yadav', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', N'/Content/Blog/1705466307452_103042.JPEG', NULL, N'2', 1, 1, 1, CAST(N'2024-10-05T16:00:42.3048924' AS DateTime2), CAST(N'2024-10-07T15:49:14.9413053' AS DateTime2), NULL)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (9, N'Where does it come from?', N'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old', N'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Fin bus Bono rum et Malo rum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit met..", comes from a line in section 1.10.32.', N'/Content/Blog/1698034433422.JPEG', NULL, N'3', 1, 1, 1, CAST(N'2024-10-05T16:05:43.6100405' AS DateTime2), CAST(N'2024-10-07T15:49:19.3250957' AS DateTime2), NULL)
INSERT [dbo].[Blog] ([BlogId], [Title], [IntroText], [BlogContent], [BlogImage], [AuthorName], [Status], [IsFeature], [IsActive], [CreatedBy], [CreatedDate], [ModifiedDate], [UserId]) VALUES (10, N'Why do we use it?', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', N'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humor and the like).', N'/Content/Blog//1703257006756.JPEG', NULL, N'2', 0, 1, 1, CAST(N'2024-10-05T16:33:07.9335952' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Blog] OFF
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (8, 1)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (9, 2)
INSERT [dbo].[BlogCategories] ([BlogId], [CategoryId]) VALUES (10, 3)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (8, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (9, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 1)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (8, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (9, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 2)
INSERT [dbo].[BlogTags] ([BlogId], [TagId]) VALUES (10, 3)
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (1, N'Travel', CAST(N'2024-10-02T15:55:20.1793927' AS DateTime2), CAST(N'2024-10-02T16:30:49.3017968' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (2, N'Fashion', CAST(N'2024-10-02T16:13:57.4416112' AS DateTime2), CAST(N'2024-10-02T16:30:50.1017385' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (3, N'Fitness', CAST(N'2024-10-02T16:14:04.9201861' AS DateTime2), CAST(N'2024-10-02T16:30:44.5411575' AS DateTime2), 1)
INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (4, N'Blogging', CAST(N'2024-10-02T16:14:20.3765050' AS DateTime2), CAST(N'2024-10-02T16:30:51.0299470' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[RegUser] ON 

INSERT [dbo].[RegUser] ([UserId], [Username], [Password], [Email], [FullName], [CreatedDate]) VALUES (1, N'Amit', N'Admin@123', N'amit@dotsquares.com', N'Amit Yadav', CAST(N'2024-10-02T10:31:20.6433333' AS DateTime2))
SET IDENTITY_INSERT [dbo].[RegUser] OFF
SET IDENTITY_INSERT [dbo].[Tag] ON 

INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (1, N'Art', NULL, CAST(N'2024-10-03T11:58:03.5437114' AS DateTime2), NULL, 1)
INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (2, N'Health', N'what-is-a-slug', CAST(N'2024-10-03T11:59:07.2856167' AS DateTime2), CAST(N'2024-10-03T12:00:28.5498200' AS DateTime2), 1)
INSERT [dbo].[Tag] ([TagId], [TagName], [Slug], [CreatedDate], [ModifiedDate], [IsActive]) VALUES (3, N' Humor', N'lorem-ipsum-is-simply', CAST(N'2024-10-03T12:00:19.4209661' AS DateTime2), CAST(N'2024-10-03T12:30:47.5401169' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Tag] OFF
/****** Object:  Index [PK_Blog]    Script Date: 07-10-2024 16:25:25 ******/
ALTER TABLE [dbo].[Blog] ADD  CONSTRAINT [PK_Blog] PRIMARY KEY NONCLUSTERED 
(
	[BlogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Blog_UserId]    Script Date: 07-10-2024 16:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_Blog_UserId] ON [dbo].[Blog]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogCategories_CategoryId]    Script Date: 07-10-2024 16:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_BlogCategories_CategoryId] ON [dbo].[BlogCategories]
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_BlogTags_TagId]    Script Date: 07-10-2024 16:25:25 ******/
CREATE NONCLUSTERED INDEX [IX_BlogTags_TagId] ON [dbo].[BlogTags]
(
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_Category]    Script Date: 07-10-2024 16:25:25 ******/
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [PK_Category] PRIMARY KEY NONCLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_RegUser]    Script Date: 07-10-2024 16:25:25 ******/
ALTER TABLE [dbo].[RegUser] ADD  CONSTRAINT [PK_RegUser] PRIMARY KEY NONCLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PK_Tag]    Script Date: 07-10-2024 16:25:25 ******/
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
