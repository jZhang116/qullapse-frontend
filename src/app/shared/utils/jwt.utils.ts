import type { JwtPayload } from '@core/models/auth/jwt-payload.model';

export function decodeJWT(token: string): JwtPayload {
	const payload = token.split('.')[1];
	return JSON.parse(atob(payload));
}

export function isTokenExpired(token: string): boolean {
	const decoded = decodeJWT(token);
	const now = Date.now() / 1000;
	return decoded.exp < now;
}
