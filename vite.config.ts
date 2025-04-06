import { readFileSync } from 'fs';
import path from 'path';

import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';

export default defineConfig({
	root: 'src',
	publicDir: '../public',
	base: '/',
	plugins: [inlineAngularTemplateStyle()],
	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 4200,
		strictPort: true,
		fs: { allow: ['.'] },
		watch: {
			usePolling: true,
			interval: 100,
			awaitWriteFinish: {
				stabilityThreshold: 200,
				pollInterval: 100,
			},
		},
	},
});

function inlineAngularTemplateStyle(): PluginOption {
	return {
		name: 'vite-inline-angular',
		transform(code: string, id: string): string | undefined {
			if (!id.endsWith('.ts')) return;

			const templateUrlMatch = code.match(/templateUrl:\s*['"`](.+?)['"`]/);
			const styleUrlMatch = code.match(/styleUrls?:\s*\[\s*['"`](.+?)['"`]\s*\]/);

			let newCode = code;

			if (templateUrlMatch) {
				const templatePath = path.resolve(path.dirname(id), templateUrlMatch[1]);
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				const templateContent = readFileSync(templatePath, 'utf-8').replace(/`/g, '\\`');
				newCode = newCode.replace(
					templateUrlMatch[0],
					`template: \`\n${templateContent}\n\``,
				);
				this.addWatchFile(templatePath);
			}

			if (styleUrlMatch) {
				const stylePath = path.resolve(path.dirname(id), styleUrlMatch[1]);
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				const styleContent = readFileSync(stylePath, 'utf-8').replace(/`/g, '\\`');
				newCode = newCode.replace(styleUrlMatch[0], `styles: [\`\n${styleContent}\n\`]`);
				this.addWatchFile(stylePath);
			}

			return newCode;
		},
	};
}
