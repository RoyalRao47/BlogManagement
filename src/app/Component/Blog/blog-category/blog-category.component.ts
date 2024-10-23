import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { NgClass, NgIf, NgFor, DatePipe, DOCUMENT, isPlatformBrowser, formatDate } from '@angular/common';
import { BlogCategoryService } from '../../../Service/Category/blog-category.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(''),
    name: new FormControl(''),
    isActive: new FormControl(false),
  });
  formSubmitted: boolean = false;
  formDataRespo: any;
  categoryList: any;
  model: any = {};
  querySuccess: boolean = false;
  constructor(private fb: FormBuilder, private blogCategoryService: BlogCategoryService, private router: Router) {
    this.categoryList = []
  }
  get f(): { [key: string]: AbstractControl } {
    return this.categoryForm.controls;
  }
  
  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryId: [null],
      name: [null, [Validators.required, Validators.min(1), Validators.max(200)]],
      isActive: [null, [Validators.required]],
    });
    this.getAllCategory();
  }
  
  getAllCategory() {
    this.blogCategoryService.GetAllCategory().subscribe(data => {
      this.categoryList = JSON.parse(JSON.stringify(data) ?? "");
    });
  }
  
  onSubmit(): void {
    this.formSubmitted = true;
  
    if (this.categoryForm.invalid) {
      console.log("invalid");
      return;
    }
    console.log(JSON.stringify(this.categoryForm.value));
    if (this.categoryForm.value.categoryId != null) {
      this.model.categoryId = parseInt(this.categoryForm.value.categoryId);
    }
    else {
      this.model.categoryId = 0;
    }
    this.model.categoryName = this.categoryForm.value.name;
    this.model.isActive = (this.categoryForm.value.isActive.toLowerCase() === "true") ;
  
    this.blogCategoryService.SubmitCategory(this.model).subscribe(res => {
      this.querySuccess = true;
      this.getAllCategory();
    })
  
    this.formSubmitted = false;
    this.categoryForm.reset();
  }
  
  onReset(): void {
  
    this.formSubmitted = false;
    this.categoryForm.reset();
  }
  
  onEdit(value: string): void {
    this.GetCategoryById(value);
  }

  
  
  GetCategoryById(value: any) {
    this.blogCategoryService.GetCategoryById(value).subscribe(data => {
      this.formDataRespo = data;
      console.log(" GetIncomeSource res" + JSON.stringify(this.formDataRespo));
      this.categoryForm.setValue({
        categoryId: this.formDataRespo.categoryId,
        name: this.formDataRespo.categoryName,
        isActive: "" + this.formDataRespo.isActive + "",
      });
    });
  }

  onChangeStatus(value: string): void {
    this.ChangeStatus(value);
  }
  
  ChangeStatus(value: any) {
    this.blogCategoryService.ChangeStatus(value).subscribe(data => {
      this.getAllCategory();
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
