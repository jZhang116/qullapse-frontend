import type { LoginPayload } from '@core/models/auth/login-payload.model';
import type { AuthResponse } from '@core/models/auth/token-response.model';

export abstract class AuthRepository {
	abstract login(payload: LoginPayload): Promise<AuthResponse>;

	abstract refresh(): Promise<AuthResponse>;
}
