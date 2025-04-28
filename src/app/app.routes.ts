import type { Routes } from '@angular/router';

import { AuthLayoutComponent } from '@presentation/layouts/auth-layout.component';
import { shellGuard } from '@presentation/layouts/guards/shell.guard';
import { ShellLayoutComponent } from '@presentation/layouts/shell-layout.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [shellGuard],
		component: ShellLayoutComponent,
	},
	{
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'prefix',
				loadChildren: () =>
					import('@presentation/features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
			},
		],
	},
];
