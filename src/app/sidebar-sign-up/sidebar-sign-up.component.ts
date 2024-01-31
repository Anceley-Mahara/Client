import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to handle navigation


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/apply',          title: 'Apply',             icon: 'nc-badge',     class: ''},
    //{ path: '/renewal',         title: 'Renewal Applicant',             icon:'nc-diamond',    class: '' },
    //{ path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    //{path: '/logout',         title: 'Logout',            icon: 'nc-share-66', class: ''},
    //{ path: '/register',     title: 'Register',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    selector: 'sidebar-sign-up-cmp',
    templateUrl: 'sidebar-sign-up.component.html',
})

export class SidebarSignUpComponent implements OnInit {

    constructor(private router: Router) {}

    logout() {   
        // Navigate to the login page
        window.sessionStorage.clear();
        // Clearing all data in localStorage
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
