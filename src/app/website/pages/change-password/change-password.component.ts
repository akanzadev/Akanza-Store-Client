import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface Passwords {
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changeForm!: FormGroup;
  token: string | null = '';
  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
    });
  }
  private buildForm() {
    this.changeForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: this.checkPasswords('password', 'repeatPassword'),
      }
    );
  }
  checkPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  validateRequired(name: string) {
    return (
      this.changeForm.get(name)?.touched &&
      this.changeForm.get(name)?.hasError('required')
    );
  }

  validateMinLength(name: string) {
    return (
      this.changeForm.get(name)?.touched &&
      this.changeForm.get(name)?.hasError('minlength')
    );
  }

  validateConfirmPasswordMatch() {
    return (
      this.changeForm.get('repeatPassword')?.touched &&
      this.changeForm.get('repeatPassword')?.hasError('confirmPasswordMatch')
    );
  }

  onSubmit() {
    if (this.changeForm.valid && this.token) {
      console.log(this.changeForm.value);
      this.authService
        .changePassword(this.token, this.changeForm.value.password)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
        });
    } else {
      this.changeForm.markAllAsTouched();
    }
  }
}
