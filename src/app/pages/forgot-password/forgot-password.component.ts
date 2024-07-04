import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface forgotPasswordForm {
  email: FormControl
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    
  ],
  providers: [
    LoginService,
    
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup<forgotPasswordForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  submit(){
    this.loginService.forgotpassword(this.forgotPasswordForm.value.email).subscribe({
      next: () => this.toastService.success("Email de recuperação enviado com sucesso!"),
      error: () => this.toastService.error("Não foi possivel recuperar senha")
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }

  navigateRegister(){
    this.router.navigate(["signup"])
  }
}