import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import type { LoginPayload } from '@core/models/auth/login-payload.model';
import { AuthRepository } from '@core/repositories/auth.repository';
import { isTokenExpired } from '@shared/utils/jwt.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly authRepo = inject(AuthRepository);

	private readonly router = inject(Router);

	async login(payload: LoginPayload): Promise<boolean> {
		const token = await this.authRepo.login(payload);
		localStorage.setItem('access_token', token.accessToken);
		return true;
	}

	async logout(): Promise<void> {
		localStorage.removeItem('access_token');
		await this.router.navigate(['/login']);
	}

	getToken(): string | null {
		return localStorage.getItem('access_token');
	}

	async refreshToken(): Promise<boolean> {
		const newToken = await this.authRepo.refresh();
		localStorage.setItem('access_token', newToken.accessToken);
		return true;
	}

	isLoggedIn(): boolean {
		const token = this.getToken();
		return !!token && !isTokenExpired(token);
	}
}
