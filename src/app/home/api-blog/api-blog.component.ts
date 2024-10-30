import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiBlogService } from 'src/app/Service/ApiBlog/api-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-blog',
  templateUrl: './api-blog.component.html',
  styleUrls: ['./api-blog.component.css']
})
export class ApiBlogComponent implements OnInit {
  blogList: any;
  public imageUrl = environment.imageUrl;
  currentPage = 1;
  pageSize = 4;
  totalPages: number =0;
  searchQuery = 'angular';
  constructor(private fb: FormBuilder, private apiBlogService: ApiBlogService, private router: Router) {
      this.blogList = [];
      console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
  }
  
  ngOnInit() {
    console.log('Current Environment: ', environment.production ? 'Production' : 'Development');
    this.getAllApiBlog();
  }
  
  getAllApiBlog() {
    this.apiBlogService.GetAllApiBlog(this.searchQuery).subscribe(data => {
      this.blogList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/api-blogdetail', value]);
  }

}
