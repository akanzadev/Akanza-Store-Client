import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss'],
})
export class RecoveryFormComponent implements OnInit {
  recoveryForm!: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recoveryForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.authService
        .sendEmailForRecovery(this.recoveryForm.value.email)
        .subscribe({
          next: () => {
            console.log('Email sent');
          },
          error: (err) => {
            alert(err.error.message);
            this.recoveryForm.reset();
          },
        });
    } else {
      this.recoveryForm.markAllAsTouched();
    }
  }
  validateRequired(name: string) {
    return (
      this.recoveryForm.get(name)?.touched &&
      this.recoveryForm.get(name)?.hasError('required')
    );
  }
  validateEmail(name: string) {
    return (
      this.recoveryForm.get(name)?.touched &&
      this.recoveryForm.get(name)?.hasError('email')
    );
  }
}
