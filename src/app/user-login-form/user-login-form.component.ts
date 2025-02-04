import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router  
  ) { }

  ngOnInit(): void { }

  // This function handles user login
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log('User logged in:', response);
  
      // Store user data & token in localStorage
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
  
      // Redirect to Movies page before refreshing
      this.router.navigate(['movies']).then(() => {
        window.location.reload(); 
      });
  
      // Close dialog
      this.dialogRef.close();
  
      // Show success message
      this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Login failed:', error);
      this.snackBar.open('Invalid username or password', 'OK', {
        duration: 2000
      });
    });
  }
    
}
