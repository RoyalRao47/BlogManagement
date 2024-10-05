import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { CommonModule, NgClass, NgIf, NgFor, DatePipe, DOCUMENT, isPlatformBrowser, formatDate } from '@angular/common';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { LoginUserService } from '../../../Service/Login/login-user.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  userSubmitted: boolean = false;
  loginModel: any = {};
  errorMessage: string = "";
  constructor(private fb: FormBuilder, private loginUserService: LoginUserService, private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onCreateUser() {
    this.router.navigate(['/create-user']);
  }

  onSubmit(): void {
    this.userSubmitted = true;
    if (this.loginForm.invalid) {
      console.log("invalid");
      return;
    }
    this.loginModel.username = this.loginForm.value.email;
    this.loginModel.password = this.loginForm.value.password;
    this.loginUserService.loginUser(this.loginModel).subscribe((res: { status: any; message: string; }) => {
      if (res.status) {
        this.router.navigate(['/blog-category']);
      }
      else {
        this.errorMessage = res.message;
      }
    })

  }


}
