import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-register-page',
	imports: [CommonModule],
	template: ` <h4 class="text-center mb-3">Register</h4> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
