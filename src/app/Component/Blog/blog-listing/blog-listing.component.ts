import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { NgClass, NgIf, NgFor, DatePipe, DOCUMENT, isPlatformBrowser, formatDate } from '@angular/common';
import { BlogCategoryService } from '../../../Service/Category/blog-category.service';
import { BlogTagService } from '../../../Service/Tag/blog-tag.service';
import { CreateBlogService } from '../../../Service/Blog/create-blog.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.css']
})
export class BlogListingComponent  implements OnInit {
  public imageUrl = environment.imageUrl;
  blogList: any;
  currentUserId = sessionStorage.getItem('currentUserId');
  constructor(private fb: FormBuilder, private blogCategoryService: BlogCategoryService, private blogTagService: BlogTagService,
    private createBlogService: CreateBlogService,  private router: Router) {
      this.blogList = []
  }
  
  ngOnInit() {
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.GetAllBlogByUserId(this.currentUserId)
  }
  
  GetAllBlogByUserId(value: any) {
    this.createBlogService.GetAllBlogByUserId(value).subscribe(data => {
      this.blogList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }
  onEditBlog(value: any) {
    debugger;
    this.router.navigate(['/create-blog', value]);
  }
  onChangeStatus(value: string): void {
    this.ChangeStatus(value);
  }
  
  ChangeStatus(value: any) {
    this.createBlogService.ChangeStatus(value).subscribe(data => {
      this.GetAllBlogByUserId(this.currentUserId)
    });
  }
  getStatus(isActive: string): string {
    var p = "";
    if (isActive == "Yes") {
      p = '<strong><em><u class="btn btn-success  btn-sm">Active</u></em></strong>';
    }
    else {
      p = '<strong><em><u class="btn btn-danger btn-sm">InActive</u></em></strong>';
    }
    return p;
  }

}
