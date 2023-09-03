import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: EstimateComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RouterModule.forChild(routes),
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
