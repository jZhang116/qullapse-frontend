import { provideEnvironmentInitializer, inject } from '@angular/core';

import { AuthService } from '@infrastructure/services/auth.service';

export const authInitializer = provideEnvironmentInitializer(async () => {
	const auth = inject(AuthService);

	if (!auth.isLoggedIn()) {
		try {
			await auth.refreshToken();
		} catch {
			await auth.logout();
		}
	}
});
