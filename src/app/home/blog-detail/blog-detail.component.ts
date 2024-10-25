import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBlogService } from 'src/app/Service/Blog/create-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  public imageUrl = environment.imageUrl;
  value: any;
  dataResponse: any;
  model: any = {};
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });
  formSubmitted: boolean = false;
  querySuccess: boolean = false;
  currentUserId = sessionStorage.getItem('currentUserId');
  commentList: any;
  relatedBlogList : any;
  categoryId : any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private createBlogService: CreateBlogService,
    private route: ActivatedRoute
  ) {
    this.commentList = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const value = params.get('value');
      this.GetBlogById(value);
      this.GetBlogCommentById(value);
    });
    this.value = this.route.snapshot.paramMap.get('value');
    if (this.value != null) {
      this.GetBlogById(this.value);
      this.GetBlogCommentById(this.value);
      
    }
    this.commentForm = this.fb.group({
      comment: [null, [Validators.required, Validators.min(10), Validators.max(200)]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.commentForm.controls;
  }

  GetBlogById(value: any) {
    this.createBlogService.GetBlogDetailById(value).subscribe((data) => {
      this.dataResponse = data;
      this.categoryId = this.dataResponse.categoryId;
      this.GetRelatedBlog(this.value, this.categoryId);
    });
  }

  GetBlogCommentById(value: any) {
    this.createBlogService.GetBlogCommentById(value).subscribe((data) => {
      this.commentList = JSON.parse(JSON.stringify(data) ?? '');
    });
  }

  GetRelatedBlog(value: any, categoryId : any) {
    this.createBlogService.GetRelatedBlog(value, categoryId).subscribe((data) => {
      this.relatedBlogList = JSON.parse(JSON.stringify(data) ?? '');
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.commentForm.invalid) {
      console.log('invalid');
      return;
    }

    this.model.commentID = 0;
    this.model.postID = this.value;
    this.model.userID = this.currentUserId;
    this.model.parentCommentID = null;
    this.model.content = this.commentForm.value.comment;
    this.model.status = 'Approved';
    console.log(JSON.stringify(this.model));
    this.createBlogService.SaveBlogComment(this.model).subscribe((res) => {
      this.querySuccess = true;
      this.GetBlogCommentById(this.value);
    });

    this.formSubmitted = false;
    this.commentForm.reset();
  }
  onViewBlog(value: any) {
    this.router.navigate(['/blog-detail', value]);
  }
}
