import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBlogService } from 'src/app/Service/Blog/create-blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  value: any;
  dataResponse: any;
  constructor(
    private router: Router,
    private createBlogService: CreateBlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const value = params.get('value');
      console.log('Value from route:', value);
    });
    this.value = this.route.snapshot.paramMap.get('value');
    if (this.value != null) {
      this.GetBlogById(this.value);
    }
  }

  GetBlogById(value: any) {
    this.createBlogService.GetBlogDetailById(value).subscribe((data) => {
      this.dataResponse = data;
      console.log(' GetBlogById res' + JSON.stringify(this.dataResponse));
    });
  }
}
