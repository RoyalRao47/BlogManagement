import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBlogService } from 'src/app/Service/Blog/create-blog.service';
import { BlogCategoryService } from 'src/app/Service/Category/blog-category.service';
import { BlogTagService } from 'src/app/Service/Tag/blog-tag.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  blogList: any;
  public imageUrl = environment.imageUrl;
  currentPage = 1;
  pageSize = 4;
  totalPages: number =0;
  searchQuery = '';
  
  constructor(private fb: FormBuilder, private blogCategoryService: BlogCategoryService, private blogTagService: BlogTagService,
    private createBlogService: CreateBlogService,  private router: Router) {
      this.blogList = [];
      console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
  }
  
  ngOnInit() {
    console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
    this.loadBlogs();
  }
  
  getAllBlog() {
    this.createBlogService.GetActiveBlog().subscribe(data => {
      this.blogList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/blog-detail', value]);
  }



  loadBlogs() {
      this.createBlogService.GetPagedBlogList(this.currentPage, this.pageSize, this.searchQuery).subscribe(
        (response) => {
          this.blogList  = response.body; // Access the response body
          const paginationHeader = response.headers.get('X-Pagination');
          if (paginationHeader !== null) {
            const pagination = JSON.parse(paginationHeader);
              this.totalPages = pagination.TotalPages;
          } else {
              console.error("X-Pagination header is missing");
              const pagination = {}; // or whatever default structure you want
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadBlogs();
  }

  onPageNumber(page: number) {
    if (page < 1 || page > this.totalPages) return; // Ensure page is within bounds
    this.currentPage = page;
    // Fetch new data based on currentPage
    this.loadBlogs();
  }

  onSearch() {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);
      // Implement your search logic here
    } else {
      console.log('Please enter a search query.');
    }
    this.currentPage = 1;
    this.loadBlogs();
  }




}
