import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  model: any = {};
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });
  formSubmitted: boolean = false;
  querySuccess: boolean = false;
  currentUserId = sessionStorage.getItem('currentUserId');
  commentList: any;
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
      console.log('Value from route:', value);
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
      console.log(' GetBlogById res' + JSON.stringify(this.dataResponse));
    });
  }

  GetBlogCommentById(value: any) {
    this.createBlogService.GetBlogCommentById(value).subscribe((data) => {
      this.commentList = JSON.parse(JSON.stringify(data) ?? '');
      console.log(' GetBlogCommentById res' + JSON.stringify(this.commentList));
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
}
