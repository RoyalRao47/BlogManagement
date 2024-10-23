import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  userType: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.userType = sessionStorage.getItem('currentUserId');
      if (this.userType == null) {
        this.userType = 0;
      }
      console.log('userType ' + this.userType);
    }
  }
  onSignOut(value: any) {
    sessionStorage.removeItem('currentUserId');
    
    // Redirect to login page after clearing session
    this.router.navigate(['/']);
  }
}
