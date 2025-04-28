import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth-layout',
	imports: [CommonModule, RouterOutlet],
	template: `
		<div class="auth-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
			<div class="auth-card card shadow p-4" style="min-width: 350px; max-width: 400px;">
				<div class="text-center mb-4">
					<h2 class="mb-0">Qullapse</h2>
					<small class="text-muted">Welcome 👋</small>
				</div>
				<router-outlet />
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthLayoutComponent {}
