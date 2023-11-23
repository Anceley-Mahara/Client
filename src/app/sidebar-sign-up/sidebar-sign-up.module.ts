import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarSignUpComponent } from './sidebar-sign-up.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarSignUpComponent ],
    exports: [ SidebarSignUpComponent ]
})

export class SidebarSignUpModule {}
