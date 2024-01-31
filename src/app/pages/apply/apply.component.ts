import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'app/models/apply/application';
import { ToastrService } from "ngx-toastr";
import { ApplicationService } from 'app/services/apply/application.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'apply',
  templateUrl: 'apply.component.html'
})
export class ApplyComponent implements OnInit {
  applicationForm: FormGroup;

  isLoading = false;
  isExisting = false;
  submittedApplications: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private applicationService: ApplicationService, private router: Router) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateApplied: [''],
      sex: ['', Validators.required],
      passportNumber: ['', Validators.required],
      passportIssueDate: ['', Validators.required],
      passportExpiryDate: ['', Validators.required],
      nationality: ['', Validators.required],
      institution: ['', Validators.required],
      course: ['', Validators.required],
      studyYear: ['', Validators.required],
      duration: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      status: ['New Applicant', Validators.required],
      approved: ['No', Validators.required],
      applicationType: ['', Validators.required],
      registrationProofFile: [null, Validators.required],
      academicRecordFile: [null],
      passportFile: [null, Validators.required],
      residenceProofFile: [null, Validators.required],
      criminalRecordNamibiaFile: [null, Validators.required],
      criminalRecordOriginFile: [null]
    });
   }

   onFileSelected(event: Event, field: string): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.applicationForm.patchValue({ [field]: fileList[0] });
    }
  }

  ngOnInit(): void {
    this.retrieveApplications();
  }

  onSubmit(): void {
    console.log(this.applicationForm.value);
    console.log(this.applicationForm.valid);
     if (!this.applicationForm.valid) { // Check if the form is valid
      this.showValidationError();
    } else{
     // Set the current timestamp when the user submits the application
     let appliedDate = new Date().toISOString();
    // Prepare the FormData to send to the server
    const formData = new FormData;
    formData.append('name', this.applicationForm.get('name').value);
    formData.append('surname', this.applicationForm.get('surname').value);
    formData.append('dateOfBirth', this.applicationForm.get('dateOfBirth').value);
    formData.append('dateApplied', appliedDate);
    formData.append('sex', this.applicationForm.get('sex').value);
    formData.append('passportNumber', this.applicationForm.get('passportNumber').value);
    formData.append('passportIssueDate', this.applicationForm.get('passportIssueDate').value);
    formData.append('passportExpiryDate', this.applicationForm.get('passportExpiryDate').value);
    formData.append('nationality', this.applicationForm.get('nationality').value);
    formData.append('institution', this.applicationForm.get('institution').value);
    formData.append('course', this.applicationForm.get('course').value);
    formData.append('studyYear', this.applicationForm.get('studyYear').value);
    formData.append('duration', this.applicationForm.get('duration').value);
    formData.append('email', this.applicationForm.get('email').value);
    formData.append('phone', this.applicationForm.get('phone').value);
    formData.append('residentialAddress', this.applicationForm.get('residentialAddress').value);
    formData.append('status', this.applicationForm.get('status').value);
    formData.append('approved', this.applicationForm.get('approved').value);
    formData.append('applicationType', this.applicationForm.get('applicationType').value);

    formData.append('registrationProofFile', this.applicationForm.get('registrationProofFile').value);
    formData.append('academicRecordFile', this.applicationForm.get('academicRecordFile').value);
    formData.append('passportFile', this.applicationForm.get('passportFile').value);
    formData.append('residenceProofFile', this.applicationForm.get('residenceProofFile').value);
    formData.append('criminalRecordNamibiaFile', this.applicationForm.get('criminalRecordNamibiaFile').value);
    formData.append('criminalRecordOriginFile', this.applicationForm.get('criminalRecordOriginFile').value);

    if(this.isExisting){
      this.showNotification2('bottom', 'center');
      // Refresh the page
      this.router.navigate(['/apply']);
    }else {
      this.isLoading = true;
    // Send the form data to the server
    this.applicationService.create(formData)
    .subscribe(response => {
        console.log('Registration successful',response);
        this.isLoading = false;
        this.showNotification('top', 'center');
         // After successful submission, clear the form
         this.clearForm();
      }, error =>{
        console.error('There is an Error:', error);
    });
  };
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
          this.isExisting = this.checkIfApplicationExists(
            this.applicationForm.get('passportNumber').value,
            this.applicationForm.get('email').value
          );

          console.log(data);
        },
        error => {
          console.error('Error retrieving applications:', error);
        });
  }

  private checkIfApplicationExists(passportNumber: string, email: string): boolean {
    const normalizedPassportNumber = passportNumber?.toLowerCase();
    return this.submittedApplications.some(app =>
      app.passportNumber?.toLowerCase() === normalizedPassportNumber ||
      app.email === email
    );
  }

  clearForm(): void {
    this.applicationForm.reset({
      name:'',
      surname: '',
      dateOfBirth: '',
      dateApplied: '',
      sex:'',
      passportNumber:'',
      passportIssueDate: '',
      passportExpiryDate: '',
      nationality: '',
      institution: '',
      course: '',
      studyYear: '',
      duration: '',
      email: '',
      phone: '',
      residentialAddress: '',
      status: 'New Applicant', // reset to initial value if needed
      approved: 'No', // reset to initial value if needed
      applicationType: '',
      registrationProofFile: null,
      academicRecordFile: null,
      passportFile: null,
      residenceProofFile: null,
      criminalRecordNamibiaFile: null,
      criminalRecordOriginFile: null,
    });
  }

}
