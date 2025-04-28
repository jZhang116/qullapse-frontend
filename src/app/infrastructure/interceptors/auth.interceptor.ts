import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';

import { AuthService } from '@infrastructure/services/auth.service';
import { isTokenExpired } from '@shared/utils/jwt.utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthService);

	if (req.url.includes('/refresh')) {
		return next(req);
	}

	const token = auth.getToken();

	if (!token) {
		return next(req);
	}

	if (!isTokenExpired(token)) {
		const cloned = req.clone({
			setHeaders: { authorization: `Bearer ${token}` },
		});
		return next(cloned);
	}

	return from(auth.refreshToken()).pipe(
		switchMap(() => {
			const newToken = auth.getToken();
			if (!newToken) {
				return throwError(() => new Error('Unable to refresh token'));
			}

			const cloned = req.clone({
				setHeaders: { authorization: `Bearer ${newToken}` },
			});
			return next(cloned);
		}),
		catchError((err) => {
			void auth.logout();
			return throwError(() => err);
		}),
	);
};
