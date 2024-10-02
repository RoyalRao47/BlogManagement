import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { NgClass, NgIf, NgFor, DatePipe, DOCUMENT, isPlatformBrowser, formatDate } from '@angular/common';
//import { CreateuserService } from '../../../Service/UserService/createuser.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { CreateUserService } from '../../../Service/User/create-user.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    fullName: new FormControl(''),
  });
  userSubmitted: boolean = false;
  userDataRespo: any;
  userDataList: any;
  userModel: any = {};
  querySuccess: boolean = false;

  constructor(private fb: FormBuilder, private createUserService: CreateUserService, private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>, private router: Router) {
    this.userDataList = []
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      userId: [null],
      username: [null, [Validators.required, Validators.min(1), Validators.max(15)]],
      password: [null, [Validators.required, Validators.min(6), Validators.max(15)]],
      email: [null, [Validators.required, Validators.email]],
      fullName: [null, [Validators.required]],
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onLogin(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    this.userSubmitted = true;

    if (this.userForm.invalid) {
      console.log("invalid");
      return;
    }
    console.log(JSON.stringify(this.userForm.value));
    if (this.userForm.value.userId != null) {
      this.userModel.userId = parseInt(this.userForm.value.userId);
    }
    else{
      this.userModel.userId = 0;
    }
    this.userModel.username = this.userForm.value.username ;
    this.userModel.email = this.userForm.value.email;
    this.userModel.password = this.userForm.value.password;
    this.userModel.fullName = this.userForm.value.fullName;

    this.createUserService.submitCreateUser(this.userModel).subscribe((_res: any) => {
      this.querySuccess = true;
    })
    this.userSubmitted = false;
    this.userForm.reset();
    this.router.navigate(['']);
  }

  onReset(): void {

    this.userSubmitted = false;
    this.userForm.reset();
  }
}
