import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { LoginPayload } from '@core/models/auth/login-payload.model';
import type { AuthResponse } from '@core/models/auth/token-response.model';
import type { AuthRepository } from '@core/repositories/auth.repository';
import { environment } from '@environments/enviroment';

@Injectable()
export class HttpAuthRepository implements AuthRepository {
	private readonly baseUrl = `${environment.apiUrl}/auth`;

	private readonly http = inject(HttpClient);

	login(payload: LoginPayload): Promise<AuthResponse> {
		return firstValueFrom(
			this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload, {
				withCredentials: true,
			}),
		);
	}

	refresh(): Promise<AuthResponse> {
		return firstValueFrom(
			this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, {}, { withCredentials: true }),
		);
	}
}
