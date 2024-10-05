import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { NgClass, NgIf, NgFor, DatePipe, DOCUMENT, isPlatformBrowser, formatDate } from '@angular/common';
import { BlogTagService } from '../../../Service/Tag/blog-tag.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-tag',
  templateUrl: './blog-tag.component.html',
  styleUrls: ['./blog-tag.component.css']
})
export class BlogTagComponent implements OnInit {
  tagForm: FormGroup = new FormGroup({
    tagId: new FormControl(''),
    tagName: new FormControl(''),
    slug: new FormControl(''),
    isActive: new FormControl(false),
  });
  formSubmitted: boolean = false;
  formDataRespo: any;
  tagList: any;
  model: any = {};
  querySuccess: boolean = false;
  constructor(private fb: FormBuilder, private blogTagService: BlogTagService, private router: Router,private toastr: ToastrService) {
    this.tagList = []
  }
  get f(): { [key: string]: AbstractControl } {
    return this.tagForm.controls;
  }
  
  ngOnInit() {
    this.tagForm = this.fb.group({
      tagId: [null],
      tagName: [null, [Validators.required, Validators.min(1), Validators.max(200)]],
      slug: [null],
      isActive: [null, [Validators.required]],
    });
    this.getAllTag();
  }
  
  getAllTag() {
    this.blogTagService.GetAllTag().subscribe(data => {
      this.tagList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }
  
  onSubmit(): void {
    this.formSubmitted = true;
  
    if (this.tagForm.invalid) {
      console.log("invalid");
      return;
    }
    console.log(JSON.stringify(this.tagForm.value));
    if (this.tagForm.value.tagId != null) {
      this.model.tagId = parseInt(this.tagForm.value.tagId);
    }
    else {
      this.model.tagId = 0;
    }
    this.model.tagName = this.tagForm.value.tagName;
    this.model.slug = this.tagForm.value.slug;
    this.model.isActive = (this.tagForm.value.isActive.toLowerCase() === "true") ;
  
    this.blogTagService.SubmitTag(this.model).subscribe(res => {
      this.querySuccess = true;
      this.toastr.success('Tag Saved Successfully!', 'Success');
      this.getAllTag();
    })
  
    this.formSubmitted = false;
    this.tagForm.reset();
  }
  
  onReset(): void {
  
    this.formSubmitted = false;
    this.tagForm.reset();
  }
  
  onEdit(value: string): void {
    this.GetTagById(value);
  }
  GetTagById(value: any) {
    this.blogTagService.GetTagById(value).subscribe(data => {
      this.formDataRespo = data;
      console.log(" GetTagById res" + JSON.stringify(this.formDataRespo));
      this.tagForm.setValue({
        tagId: this.formDataRespo.tagId,
        tagName: this.formDataRespo.tagName,
        slug: this.formDataRespo.slug,
        isActive: "" + this.formDataRespo.isActive + "",
      });
    });
  }

  onChangeStatus(value: string): void {
    this.ChangeStatus(value);
  }
  
  ChangeStatus(value: any) {
    this.blogTagService.ChangeStatus(value).subscribe(data => {
      this.getAllTag();
    });
  }

  getStatus(isActive: boolean): string {
    var p = "";
    if (isActive == true) {
      p = '<strong><em><u class="btn btn-success  btn-sm">Active</u></em></strong>';
    }
    else {
      p = '<strong><em><u class="btn btn-danger btn-sm">InActive</u></em></strong>';
    }
    return p;
  }
}
