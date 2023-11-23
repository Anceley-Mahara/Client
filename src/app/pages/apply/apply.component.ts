import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'app/models/apply/application';
import { ToastrService } from "ngx-toastr";
import { ApplicationService } from 'app/services/apply/application.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'apply',
  templateUrl: 'apply.component.html'
})
export class ApplyComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm; // Add a reference to the form

  isLoading = false;
  isExisting = false;
  submittedApplications: any;

  application: Application = {
    name: '',
    surname: '',
    dateOfBirth: '',
    dateApplied: '',
    sex: '',
    passportNumber:'',
    passportIssueDate:'',
    passportExpiryDate:'',
    nationality:'',
    institution:'',
    course:'',
    studyYear: null,
    duration: null,
    email:'',
    phone:'',
    residentialAddress:'',
    status: 'New Applicant',
    approved: 'No',
    applicationType: '',
    registrationProofFile: null,
    academicRecordFile: null,
    passportFile: null,
    residenceProofFile: null,
    criminalRecordNamibiaFile: null,
    criminalRecordOriginFile: null,
  };

  constructor(private toastr: ToastrService, private applicationService: ApplicationService, private router: Router) {

   }
   onFileSelected(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      this.application[fieldName] = event.target.files[0];
      console.log(`${fieldName} selected:`, event.target.files[0]);
    }
  }

  ngOnInit(): void {
    this.retrieveApplications();
  }

  submitApplication(): void {
     if (this.myForm.valid) { // Check if the form is valid
     
     // Set the current timestamp when the user submits the application
     this.application.dateApplied = new Date().toISOString();
    // Prepare the FormData to send to the server
    const formData = { ...this.application }; 
    if(this.isExisting){
      this.showNotification2('bottom', 'center');
      // Refresh the page
      this.router.navigate(['/apply']);
    }else {
      this.isLoading = true;
    // Send the form data to the server
    this.applicationService.create(formData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.showNotification('top', 'center');
         // After successful submission, clear the form
         this.myForm.resetForm();
      },
      error: (error) => console.error('There is an Error:', error)
    });
  };
  } else{
     this.showValidationError();
  }
}


  showNotification(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Submitted successfully</b></span>',
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

  showNotification2(from, align) {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Already Submitted</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }

  showValidationError(): void {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Form is incomplete. Please fill in all fields.</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

  retrieveApplications(): void {
    this.applicationService.getAll()
      .subscribe(
        data => {
          this.submittedApplications = data;
          const existingApp = this.submittedApplications.find(app =>
            app.passportNumber.toLowerCase() === this.application.passportNumber.toLowerCase() ||
            app.email === this.application.email
          );

          if (existingApp) {
            this.isExisting = true;
          }

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
