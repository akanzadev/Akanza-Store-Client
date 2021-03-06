import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authServie: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.authServie
        .loginAndGetProfile(
          this.userForm.value.email,
          this.userForm.value.password
        )
        .subscribe({
          next: (res) => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err.message);
          },
        });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  validateRequired(name: string) {
    return (
      this.userForm.get(name)?.touched &&
      this.userForm.get(name)?.hasError('required')
    );
  }
  validateEmail(name: string) {
    return (
      this.userForm.get(name)?.touched &&
      this.userForm.get(name)?.hasError('email')
    );
  }
}
