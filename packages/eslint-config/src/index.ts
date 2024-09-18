import tseslint from 'typescript-eslint';
import { vue, ignores } from './configs';

export function defineConfig() {
  return tseslint.config({
    ...ignores(),
    ...vue(),
  });
}
