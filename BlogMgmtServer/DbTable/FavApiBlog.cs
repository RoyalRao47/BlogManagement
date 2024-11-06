namespace BlogMgmtServer.DbTable
{
    public class FavApiBlog
    {
        public int FavApiBlogId { get; set; }
        public int BlogId { get; set; }
        public string? URL { get; set; }

        public string? Title { get; set; }
        public int UserId { get; set; }
        public bool IsApiBlog { get; set; }

    }
}