import { Component, OnInit } from '@angular/core';
import { Renewal } from 'app/models/renewal/renewal';
import { ToastrService } from "ngx-toastr";
import { RenewVisaService } from 'app/services/renewal/renew-visa.service';

@Component({
  selector: 'renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit {
  isLoading = false;

  application: Renewal = {
    name: '',
    surname: '',
    dateOfBirth: '',
    sex: '',
    passportNumber:'',
    passportIssueDate:'',
    passportExpiryDate:'',
    nationality:'',
    institution:'',
    course:'',
    studyYear:'',
    duration:'',
    email:'',
    phone:'',
    alternatePhone:'',
    postalAddress:'',
    residentialAddress:'',
    status: 'Renewal',
    approved: 'No',
    registrationProofFile: '',
    passportFile: '',
    residenceProofFile: '',
    criminalRecordNamibiaFile: '',
    criminalRecordOriginFile: '',
  };

  constructor(private toastr: ToastrService, private renewvisaService: RenewVisaService) { }

  ngOnInit(): void {
  }

  submitApplication(): void {
    this.isLoading = true;
    // Prepare the FormData to send to the server
    const formData = {
    name: this.application.name,
    surname: this.application.surname,
    dateOfBirth: this.application.dateOfBirth,
    sex: this.application.sex,
    passportNumber: this.application.passportNumber,
    passportIssueDate: this.application.passportIssueDate,
    passportExpiryDate: this.application.passportExpiryDate,
    nationality: this.application.nationality,
    institution: this.application.institution,
    course: this.application.course,
    studyYear: this.application.studyYear,
    duration: this.application.duration,
    email: this.application.email,
    phone: this.application.phone,
    alternatePhone: this.application.alternatePhone,
    postalAddress: this.application.postalAddress,
    residentialAddress: this.application.residentialAddress,
    status: this.application.status,
    registrationProofFile: this.application.registrationProofFile,
    passportFile: this.application.passportFile,
    residenceProofFile: this.application.residenceProofFile,
    criminalRecordNamibiaFile: this.application.criminalRecordNamibiaFile,
    criminalRecordOriginFile: this.application.criminalRecordOriginFile,
    };
    // Send the form data to the server
    this.renewvisaService.create(formData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.showNotification('top', 'center');
      },
      error: (e) => console.error(e)
    });
  }

  showNotification(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Application Submitted Successfully.</b></span>',
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
