import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ApplyComponent } from 'app/pages/apply/apply.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { RenewalComponent } from 'app/pages/renewal/renewal.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';

export const AdminLayoutRoutes: Routes = [
    //{ path: 'register',          component: RegisterComponent },
    {path: 'dashboard',      component: DashboardComponent },
    {path: 'apply',   component: ApplyComponent},
    {path: 'renewal', component: RenewalComponent},
    { path: 'user',           component: UserComponent },
    //{path: 'login', component: LoginComponent},
    {path: 'logout', component:LogoutComponent},
    //{ path: 'typography',     component: TypographyComponent },
    //{ path: 'icons',          component: IconsComponent },
    //{ path: 'maps',           component: MapsComponent },
   // { path: 'notifications',  component: NotificationsComponent },
    //{ path: 'upgrade',        component: UpgradeComponent }
];
