import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { LoginPayload } from '@core/models/auth/login-payload.model';

@Component({
	selector: 'app-login-form',
	imports: [CommonModule, FormsModule],
	template: `
		<form (ngSubmit)="submit()" #form="ngForm" novalidate>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input
					type="email"
					class="form-control"
					id="email"
					name="email"
					required
					[(ngModel)]="email"
					#emailInput="ngModel"
					[ngClass]="{ 'is-invalid': emailInput.invalid && emailInput.touched }"
				/>
				<div class="invalid-feedback">Please enter a valid email address.</div>
			</div>

			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					class="form-control"
					id="password"
					name="password"
					required
					[(ngModel)]="password"
					#passwordInput="ngModel"
					[ngClass]="{ 'is-invalid': passwordInput.invalid && passwordInput.touched }"
				/>
				<div class="invalid-feedback">Password is required.</div>
			</div>

			<button type="submit" class="btn btn-primary w-100" [disabled]="form.invalid">
				Login
			</button>
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
	email = '';

	password = '';

	loginEvent = output<LoginPayload>();

	submit(): void {
		this.loginEvent.emit({
			email: this.email,
			password: this.password,
		});
	}
}
