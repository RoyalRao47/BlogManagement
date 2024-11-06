import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiBlogService } from 'src/app/Service/ApiBlog/api-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apiblog-detail',
  templateUrl: './apiblog-detail.component.html',
  styleUrls: ['./apiblog-detail.component.css'],
})
export class ApiblogDetailComponent implements OnInit {
  value: any;
  dataResponse: any;
  model: any = {};
  url: string = "";
  title: string = "";
  currentUserId = sessionStorage.getItem('currentUserId');
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiBlogService: ApiBlogService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const value = params.get('value');
      this.GetBlogById(value);
    });
    this.value = this.route.snapshot.paramMap.get('value');
    if (this.value != null) {
      this.GetBlogById(this.value);
    }
  }

  GetBlogById(value: any) {
    this.apiBlogService.GetApiBlogById(value).subscribe((data) => {
      this.dataResponse = data;
      this.url = this.dataResponse.blogURL;
      this.title = this.dataResponse.title;
    });
  }
  SaveFav(value: any) {
    this.model.FavApiBlogId = 0;
    this.model.BlogId = value;
    this.model.URL = this.url;
    this.model.Title = this.title;
    this.model.IsApiBlog = true;
    this.model.UserId = this.currentUserId;

    this.apiBlogService.SaveFavApiBlog(this.model).subscribe((res) => {
      this.toastr.success('Blog saved as Favorite.', 'Success', { timeOut: 5000, progressBar: true });
      this.GetBlogById(value);
    });
  }
}
