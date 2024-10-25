import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  NgClass,
  NgIf,
  NgFor,
  DatePipe,
  DOCUMENT,
  isPlatformBrowser,
  formatDate,
} from '@angular/common';
import { BlogCategoryService } from '../../../Service/Category/blog-category.service';
import { BlogTagService } from '../../../Service/Tag/blog-tag.service';
import { CreateBlogService } from '../../../Service/Blog/create-blog.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  public imageUrl = environment.imageUrl;
  value: any;
  blogForm: FormGroup = new FormGroup({
    blogId: new FormControl(''),
    title: new FormControl(''),
    introText: new FormControl(''),
    blogContent: new FormControl(''),
    blogImage: new FormControl(''),
    status: new FormControl(''),
    isFeature: new FormControl(''),
    categoryId: new FormControl(''),
    tagId: new FormControl(''),
    isActive: new FormControl(false),
  });
  blogCategoryList: any[] = [];
  blogTagList: any[] = [];
  formSubmitted: boolean = false;
  formDataRespo: any;
  blogList: any;
  model: any = {};
  querySuccess: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  selectedTagList: any[] = [];
  blogStatusList: any[] = [];
  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  currentUserId = sessionStorage.getItem('currentUserId');
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogTagService: BlogTagService,
    private blogCategoryService: BlogCategoryService,
    private createBlogService: CreateBlogService,
    private route: ActivatedRoute
  ) {
    this.blogList = [];
    this.blogCategoryList = [];
    this.blogTagList = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'tagId',
      textField: 'tagName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }
  get f(): { [key: string]: AbstractControl } {
    return this.blogForm.controls;
  }

  ngOnInit() {
    this.blogForm = this.fb.group({
      blogId: [null],
      title: [
        null,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      introText: [
        null,
        [Validators.required, Validators.min(1), Validators.max(200)],
      ],
      blogContent: [
        null,
        [Validators.required, Validators.min(1), Validators.max(2000)],
      ],
      blogImage: [null],
      status: ['0', [Validators.required, this.validateNotZero]],
      isFeature: [null, [Validators.required]],
      categoryId: ['0', [Validators.required, this.validateNotZero]],
      selectedTag: [[], [Validators.required]],
      isActive: [null, [Validators.required]],
    });
    this.blogStatusList = this.createBlogService.getBlogStatus();
    this.blogCategoryService.GetAllCategory().subscribe((res) => {
      this.blogCategoryList = res;
    });
    this.blogTagService.GetAllTag().subscribe((res) => {
      this.blogTagList = res;
    });
    this.route.paramMap.subscribe(params => {
      const value = params.get('value');
      console.log('Value from route:', value);
    });
    this.value = this.route.snapshot.paramMap.get('value');
    if(this.value != null)
    {
      this.GetBlogById(this.value);
    }
    
  }

  GetBlogById(value: any) {
    this.createBlogService.GetBlogById(value).subscribe(data => {
      this.formDataRespo = data;
      console.log(" GetBlogById res" + JSON.stringify(this.formDataRespo));
      this.blogForm.setValue({
        blogId: this.formDataRespo.blogId,
        title: this.formDataRespo.title,
        introText: this.formDataRespo.introText,
        blogContent: this.formDataRespo.blogContent,
        categoryId: this.formDataRespo.categoryId,
        status: this.formDataRespo.status,
        blogImage: this.formDataRespo.blogImage,
        isFeature: "" + this.formDataRespo.isFeature + "",
        isActive: "" + this.formDataRespo.isActive + "",
        selectedTag : this.getTags(this.formDataRespo.tagId)
      });
    });
  }
  validateNotZero(control: any) {
    return control.value === '0' ? { invalidSelection: true } : null;
  }
  onSubmit(): void {
    this.formSubmitted = true;

    if (this.blogForm.invalid) {
      console.log('invalid');
      return;
    }
    const tagIds: number[] = this.selectedTagList.map((tag) => tag.tagId);
    console.log(JSON.stringify(this.blogForm.value));
    console.log('currentUserId   ' + this.currentUserId);
    if (this.blogForm.value.blogId != null) {
      this.model.blogId = parseInt(this.blogForm.value.blogId);
    } else {
      this.model.blogId = 0;
    }
    this.model.title = this.blogForm.value.title;
    this.model.introText = this.blogForm.value.introText;
    this.model.blogContent = this.blogForm.value.blogContent;
    this.model.isFeature = this.blogForm.value.isFeature.toLowerCase() === 'true';
    this.model.categoryId = this.blogForm.value.categoryId;
    this.model.status = this.blogForm.value.status;
    this.model.tagId = tagIds;
    this.model.isActive = this.blogForm.value.isActive.toLowerCase() === 'true';
    this.model.File = this.selectedFile;
    this.model.createdBy = this.currentUserId;

    const formData = new FormData();
    if (this.blogForm.value.blogId != null) {
      formData.append('blogId', this.blogForm.value.blogId);
    } else {
      formData.append('blogId', '0');
    }
    formData.append('title', this.blogForm.value.title);
    formData.append('introText', this.blogForm.value.introText);
    formData.append('blogContent', this.blogForm.value.blogContent);
    formData.append('isFeature', this.blogForm.value.isFeature.toLowerCase());
    formData.append('categoryId', this.blogForm.value.categoryId);
    formData.append('status', this.blogForm.value.status);
    formData.append('isActive', this.blogForm.value.isActive.toLowerCase());
    tagIds.forEach((tagId, index) => {
      formData.append('TagId', tagId.toString());
    });
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else {
      console.warn('No file selected, skipping file append.');
    }
    if (this.currentUserId) {
      formData.append('createdBy', this.currentUserId);
    } else {
      console.warn('No file selected, skipping file append.');
    }
    // this.createBlogService.SubmitBlog(formData).subscribe(res => {
    //   this.querySuccess = true;
    //   this.blogForm.reset();
    // })

    this.createBlogService.SubmitBlog(formData).subscribe({
      next: (response) => {
        console.log('Response from API:', response);
        if (response.status === true) {
          this.successMessage = response.message;
          console.log(response.message);
          this.querySuccess = true;
          this.router.navigate(['/blog-listing']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        console.error('SubmitBlog Error from API:', err);
        this.errorMessage = err;
      },
    });

     this.formSubmitted = false;
    // this.blogForm.reset();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('selectedFile   ' + this.selectedFile);
    }
  }

  onItemSelect(item: any) {
    this.selectedTagList.push(item);
    console.log(
      'select selectedTagList ' + JSON.stringify(this.selectedTagList)
    );
  }
  onItemDeSelect(item: any) {
    for (let i = 0; i < this.selectedTagList.length; i++) {
      if (this.selectedTagList[i].id === item.id) {
        this.selectedTagList.splice(i, 1);
      }
    }
    console.log(' selectedTagList ' + JSON.stringify(this.selectedTagList));
  }

  onSelectAll(items: any) {
    this.selectedTagList.splice(items);
    this.selectedTagList.push(items);
    console.log('selectedTagList ' + JSON.stringify(this.selectedTagList));
  }
  onDeSelectAll(items: any) {
    this.selectedTagList.splice(items);
    console.log('selectedTagList ' + JSON.stringify(this.selectedTagList));
  }

  getTags(tags: any) {
    var tagAarray = tags;
    var selectedTags = this.blogTagList.filter(function (item) {
      
      return tags.includes(item.tagId);
    });
    this.selectedTagList = selectedTags.map(tag => ({
      tagId: tag.tagId,
      tagName: tag.tagName
    }));
    //this.selectedTagList = this.selectedTagList.filter(item => Array.isArray(item) && item.length === 0 ? false : true);
    console.log('this.selectedTagList ' + JSON.stringify(this.selectedTagList));
    return selectedTags;

  }
}
