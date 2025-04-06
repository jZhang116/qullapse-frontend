import type { ApplicationConfig } from '@angular/core';
import { NgZone, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		{
			provide: NgZone,
			useFactory: () =>
				new NgZone({
					enableLongStackTrace: false,
					shouldCoalesceEventChangeDetection: true,
				}),
		},
	],
};
