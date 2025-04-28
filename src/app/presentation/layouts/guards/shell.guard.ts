import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';

import { AuthService } from '@infrastructure/services/auth.service';

export const shellGuard: CanActivateFn = () => {
	const auth = inject(AuthService);

	if (!auth.isLoggedIn()) {
		try {
			void auth.refreshToken();
			return true;
		} catch {
			void auth.logout();
		}
		return false;
	}

	return true;
};
