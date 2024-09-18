import { existsSync } from 'fs';
import { join } from 'path';
import { defineApplicationConfig } from './application';

export * from './application';

export function defineConfig(
  userConfigPromise?: any,
  type: 'application' | 'auto' | 'library' = 'auto',
) {
  let projectType = type;
  // 根据包是否存在 index.html,自动判断类型
  if (type === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html');
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }
  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise);
    }
    case 'library': {
      return {};
    }
    default: {
      throw new Error(`Unsupported project type: ${projectType}`);
    }
  }
}
