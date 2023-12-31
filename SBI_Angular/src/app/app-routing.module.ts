import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role.enum';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProcessNewPwdComponent } from './process-new-pwd/process-new-pwd.component'
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password_recovery', component: ForgotPasswordComponent},
  {path: 'password_reset', component: ProcessNewPwdComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.SUPERVISOR, Role.USER] },
  },
  {path: 'user_profile', component: UserProfileComponent},
  { path: '404', component: NotFoundComponent },
  { path: '401', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
