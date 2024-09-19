import { execaCommand, getPackages } from '@wm/utils';
import { cancel, isCancel, select } from '@clack/prompts';

interface RunOptions {
  command?: string;
}

export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    process.exit(1);
  }
  const { packages } = await getPackages();

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((pkg) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[command];
  });

  const selectPkg = await select<any, string>({
    message: `Select the app you need to run [${command}]:`,
    options: selectPkgs.map((item) => ({
      label: item?.packageJson.name,
      value: item?.packageJson.name,
    })),
  });

  if (isCancel(selectPkg) || !selectPkg) {
    cancel('👋 Has cancelled');
    process.exit(0);
  }
  console.log(`pnpm --filter=${selectPkg} run ${command}`);
  execaCommand(`pnpm --filter=${selectPkg} run ${command}`, {
    stdio: 'inherit',
  });
}
