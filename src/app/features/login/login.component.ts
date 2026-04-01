import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginRequest } from 'src/app/model/loginRequest';
import { LoginService } from 'src/app/service/login.service';
import { AuthResponse } from 'src/app/model/authResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  loginError:string="";

showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Inicialización adicional si es necesaria
  }

  onSubmit() {
  if (this.loginForm.valid) {
    this.loading = true;
    this.loginError = '';

    this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (userData) => {
        console.log('Usuario simulado autenticado:', userData);
       // alert(`Bienvenido ${userData.displayName}`);
      },
      error: (errorData) => {
        console.error('Error login simulado', errorData);
        this.loginError = 'Error al iniciar sesión';
      },
      complete: () => {
        this.loading = false;
        this.router.navigateByUrl('/');
        this.loginForm.reset();
      }
    });
  }
}

}