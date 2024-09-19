import { fs } from '@wm/utils';
import { join } from 'path';
import dotenv from 'dotenv';

export const getBoolean = (value: string | undefined) => value === 'true';

export const getString = (value: string | undefined, fallback: string) =>
  value ?? fallback;

export const getNumber = (value: string | undefined, fallback: number) =>
  Number(value) || fallback;
/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = /--mode ([\d_a-z]+)/;
  const result = reg.exec(script);

  if (result) {
    const mode = result[1];
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

export async function loadEnv<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
) {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const envPath = await fs.readFile(join(process.cwd(), confFile), {
        encoding: 'utf8',
      });
      const env = dotenv.parse(envPath);
      envConfig = { ...envConfig, ...env };
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error);
    }
  }
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig as T;
}

export async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles(),
) {
  const envConfig = await loadEnv(match, confFiles);
  const { VITE_APP_TITLE, VITE_PORT, VITE_INJECT_APP_LOADING } = envConfig;
  return {
    appTitle: getString(VITE_APP_TITLE, 'Vben Admin'),
    port: getNumber(VITE_PORT, 5173),
    injectAppLoading: getBoolean(VITE_INJECT_APP_LOADING),
  };
}
