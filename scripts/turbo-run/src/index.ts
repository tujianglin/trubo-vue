import { colors, consola } from '@wm/utils';
import { run } from './run';
import { cac } from 'cac';
try {
  const turboRun = cac('turbo-run');
  turboRun
    .command('[script]')
    .usage(`Run turbo interactively.`)
    .action(async (command: string) => {
      run({ command });
    });

  // 无效命令
  turboRun.on('command:*', () => {
    consola.error(colors.red('无效命令!'));
    process.exit(1);
  });

  turboRun.usage('turbo-run');
  turboRun.help();
  turboRun.parse();
} catch (error) {
  consola.error(error);
  process.exit(1);
}

export {};
