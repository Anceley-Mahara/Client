import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // You'll need Reactive Forms
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  profileForm: FormGroup;
  userDetails: any; // To store user details
  emailAddress: any;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) {
    this.emailAddress = localStorage.getItem("email");
    this.profileForm = this.formBuilder.group({
        firstname: [''],
        surname: [''], // Initialize with an empty string
        email: [''],
    });
  }

    ngOnInit(){
        // Fetch user details from the API
    this.userService.getUser(this.emailAddress).subscribe((data: any) => {
        this.userDetails = data;
        //this.profileForm.patchValue(data);
        this.populateForm();
      });
    }

    onSubmit() {
        // Submit updated user details to the API
        const updatedData = this.profileForm.value;
    
        this.userService.updateProfile(this.emailAddress, updatedData).subscribe((response) => {
          // Handle success or error
          console.log('Profile updated successfully');
          this.showNotification('top', 'center');
        });
      }

      populateForm() {
        // Populate the form controls with user data
        this.profileForm.patchValue({
            firstname: this.userDetails.firstname,
          surname: this.userDetails.surname,
          email: this.userDetails.email,
          // Add more form controls as needed
        });
      }


      showNotification(from, align) {
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Updated successfully</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
      }
}
