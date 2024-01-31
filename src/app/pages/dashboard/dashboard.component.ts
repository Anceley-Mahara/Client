import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services/apply/application.service';

@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  applications: any;
  isLoading = false;
  emailAddress: any;
  appMessage = '';

  constructor(private applicationService: ApplicationService){
    this.emailAddress = localStorage.getItem("email");

  }
    ngOnInit(){
        this.retrieveApplications();
    };

    retrieveApplications(): void {
      this.isLoading = true;
      this.applicationService.findByEmail(this.emailAddress)
        .subscribe(
          data => {
            this.applications = data;
            console.log(data);
            this.isLoading = false;
            if (this.applications.length === 0) {
              this.appMessage = "No Applications Found";
            } else {
              this.appMessage = ""; // Reset the message if applications are found
            }
          },
          error => {
            console.log(error);
            this.appMessage = "No application(s) found."; // Handle the error
            this.isLoading = false;
            console.log(this.emailAddress);
          });
          
    }

}