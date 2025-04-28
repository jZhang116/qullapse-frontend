import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthRepository } from '@core/repositories/auth.repository';
import { authInterceptor } from '@infrastructure/interceptors/auth.interceptor';
import { HttpAuthRepository } from '@infrastructure/repositories/http-auth.repository';

import { routes } from './app.routes';
import { authInitializer } from './bootstrap/auth.initializer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
		provideRouter(routes),
		authInitializer,
		{ provide: AuthRepository, useClass: HttpAuthRepository },
	],
};
