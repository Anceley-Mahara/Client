import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;
  showForgotPasswordModal = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  
  onSubmit(): void {
    this.isLoading = true;
    localStorage.setItem("email", this.form.email);
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
    // if(this.isLoggedIn){
    //   this.router.navigate(['/dashboard']);
    // }
  }

  reloadPage(): void {
    window.location.reload();
  }

  register() {   
    // Navigate to the login page
    this.router.navigate(['/register']);
  }

  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  sendResetLink(email: string) {
    // Implement the logic to send the reset link based on the provided email address.
    console.log(`Sending reset link to ${email}`);
  }

}



