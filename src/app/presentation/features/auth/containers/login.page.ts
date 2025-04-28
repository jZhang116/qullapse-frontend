import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import type { LoginPayload } from '@core/models/auth/login-payload.model';
import { AuthService } from '@infrastructure/services/auth.service';

import { LoginFormComponent } from '../components/login/login-form.component';

@Component({
	selector: 'app-login-page',
	imports: [CommonModule, LoginFormComponent],
	template: `
		<h4 class="text-center mb-3">Login</h4>
		<app-login-form (loginEvent)="loginEvent($event)"></app-login-form>
		<button (click)="refresh()">adasd</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
	private readonly auth = inject(AuthService);

	private readonly router = inject(Router);

	async loginEvent(payload: LoginPayload): Promise<void> {
		const ok = await this.auth.login(payload);
		if (ok) {
			await this.router.navigateByUrl('');
		} else {
			alert('Error en login');
		}
	}

	async refresh(): Promise<void> {
		await this.auth.refreshToken();
	}
}
