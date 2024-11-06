import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiBlogService } from 'src/app/Service/ApiBlog/api-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fav-api',
  templateUrl: './fav-api.component.html',
  styleUrls: ['./fav-api.component.css']
})
export class FavApiComponent implements OnInit {
  blogList: any;
  currentUserId = sessionStorage.getItem('currentUserId');
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
    debugger;
    var abc = this.currentUserId ?? null;
    this.apiBlogService.GetFavApiBlog(this.currentUserId).subscribe((data) => {
      if (data.length > 0) {
        this.blogList = JSON.parse(JSON.stringify(data) ?? '');
      }
      else
      {
        //this.toastr.error('No Blog found for entered Keyword.', 'Error');
        this.toastr.error('No fav Blog found for you.', 'Error', { timeOut: 5000, progressBar: true });
      }
    });
  }

  onViewBlog(value: any) {
    this.router.navigate(['/api-blogdetail', value]);
  }
}
