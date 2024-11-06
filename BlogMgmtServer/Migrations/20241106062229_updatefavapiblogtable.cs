using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlogMgmtServer.Migrations
{
    /// <inheritdoc />
    public partial class updatefavapiblogtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "FavApiBlog",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FavApiBlog");
        }
    }
}
