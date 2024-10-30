import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBlogService } from 'src/app/Service/ApiBlog/api-blog.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-apiblog-detail',
  templateUrl: './apiblog-detail.component.html',
  styleUrls: ['./apiblog-detail.component.css']
})
export class ApiblogDetailComponent  implements OnInit{
  value: any;
  dataResponse: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiBlogService: ApiBlogService,
    private route: ActivatedRoute
  ) { }

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
    });
  }

  
}
