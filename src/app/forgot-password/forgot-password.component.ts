import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ForgotPasswordService } from 'app/services/forgot-password.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() sendResetLink = new EventEmitter<string>();

  form: any = {};

  constructor(private toastr: ToastrService,private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.forgotPasswordService.forgotPassword(this.form.email).subscribe(
      (response) => {
        // Handle a successful response, e.g., show a success message to the user.
        this.showNotification('bottom', 'center');
        console.log(response);
      },
      (error) => {
        // Handle errors, e.g., display an error message to the user.
        console.error(error);
      }
    );
  }
  showNotification(from, align) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Email sent with reset password instructions</b></span>',
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

  onClose() {
    this.close.emit();
  }

  // onSendResetLink() {
  //   this.sendResetLink.emit(this.email);
  // }

}
