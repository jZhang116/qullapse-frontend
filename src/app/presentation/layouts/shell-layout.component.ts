import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-auth-layout',
	imports: [CommonModule],
	template: ` shell works!
		<button type="button" class="btn btn-primary" (click)="test()">Test</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellLayoutComponent {
	private readonly http = inject(HttpClient);

	async test(): Promise<void> {
		return await firstValueFrom(this.http.get<void>(`https://localhost:7117/api/auth/test`));
	}
}
