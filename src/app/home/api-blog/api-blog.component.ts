import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiBlogService } from 'src/app/Service/ApiBlog/api-blog.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-api-blog',
  templateUrl: './api-blog.component.html',
  styleUrls: ['./api-blog.component.css'],
})
export class ApiBlogComponent implements OnInit {
  blogList: any;
  public imageUrl = environment.imageUrl;
  currentPage = 1;
  pageSize = 4;
  totalPages: number = 0;
  searchQuery = 'angular';
  constructor(
    private fb: FormBuilder,
    private apiBlogService: ApiBlogService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.blogList = [];
    console.log(
      'Current Environment: ',
      environment.production ? 'Production' : 'Development'
    );
  }

  ngOnInit() {
    console.log(
      'Current Environment: ',
      environment.production ? 'Production' : 'Development'
    );
    this.getAllApiBlog();
  }

  getAllApiBlog() {
    this.apiBlogService.GetAllApiBlog(this.searchQuery).subscribe((data) => {
      if (data.length > 0) {
        this.blogList = JSON.parse(JSON.stringify(data) ?? '');
      }
      else
      {
        //this.toastr.error('No Blog found for entered Keyword.', 'Error');
        this.toastr.error('No Blog found for entered Keyword.', 'Error', { timeOut: 5000, progressBar: true });
        this.searchQuery = 'angular';
      }
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/api-blogdetail', value]);
  }

  onSearch() {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);
      // Implement your search logic here
    } else {
      console.log('Please enter a search query.');
    }
    this.currentPage = 1;
    this.getAllApiBlog();
  }
}
