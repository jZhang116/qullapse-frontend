// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginSonarjs = require('eslint-plugin-sonarjs');
const eslintPluginSecurity = require('eslint-plugin-security');
const path = require('path');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: path.resolve(__dirname, './tsconfig.json'),
			},
		},
		plugins: {
			import: eslintPluginImport,
			prettier: eslintPluginPrettier,
			sonarjs: eslintPluginSonarjs,
			security: eslintPluginSecurity,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: path.resolve(__dirname, './tsconfig.json'),
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/no-empty-lifecycle-method': 'warn',
			'@angular-eslint/no-input-rename': 'warn',
			'@angular-eslint/no-output-rename': 'warn',
			'@angular-eslint/prefer-on-push-component-change-detection': 'warn',
			'@angular-eslint/use-lifecycle-interface': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'default',
					format: ['camelCase'],
				},
				{
					selector: 'variableLike',
					format: ['camelCase', 'UPPER_CASE'],
				},
				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},
			],
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-extraneous-class': 'warn',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-useless-constructor': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/prefer-readonly': 'warn',
			'@typescript-eslint/require-await': 'warn',

			curly: ['error', 'all'],

			'import/named': 'error',
			'import/no-unresolved': 'error',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					alphabetize: { order: 'asc', caseInsensitive: true },
					'newlines-between': 'always',
				},
			],

			'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: false }],

			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'prefer-const': 'warn',
			'prefer-template': 'error',

			'prettier/prettier': 'error',

			'security/detect-eval-with-expression': 'error',
			'security/detect-new-buffer': 'warn',
			'security/detect-non-literal-fs-filename': 'warn',
			'security/detect-non-literal-require': 'warn',
			'security/detect-object-injection': 'warn',

			'sonarjs/cognitive-complexity': ['warn', 15],
			'sonarjs/no-collapsible-if': 'warn',
			'sonarjs/no-collection-size-mischeck': 'warn',
			'sonarjs/no-duplicate-string': 'warn',
			'sonarjs/no-duplicated-branches': 'warn',
			'sonarjs/no-identical-functions': 'warn',
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {},
	},
);
