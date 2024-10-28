
namespace BlogMgmtServer.Model
{
    public class PaginationModel
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SearchQuery { get; set; }
    }

}