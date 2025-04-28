import type { Routes } from '@angular/router';

import { LoginPageComponent } from './containers/login.page';
import { RegisterPageComponent } from './containers/register.page';

export const AUTH_ROUTES: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'register',
		component: RegisterPageComponent,
	},
];
