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

  constructor(private fb: FormBuilder, private blogCategoryService: BlogCategoryService, private blogTagService: BlogTagService,
    private createBlogService: CreateBlogService,  private router: Router) {
      this.blogList = [];
      console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
  }
  
  ngOnInit() {
    console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
    this. getAllBlog();
  }
  
  getAllBlog() {
    this.createBlogService.GetActiveBlog().subscribe(data => {
      this.blogList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/blog-detail', value]);
  }
}
