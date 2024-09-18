import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { ignores } from './configs';

export default tseslint.config(...ignores(), {});
