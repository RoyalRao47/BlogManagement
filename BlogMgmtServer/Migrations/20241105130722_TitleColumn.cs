﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlogMgmtServer.Migrations
{
    /// <inheritdoc />
    public partial class TitleColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "FavApiBlog",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "FavApiBlog");
        }
    }
}
