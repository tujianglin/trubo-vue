import { unmountGlobalLoading } from './utils/unmount-global-loading';

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  // 启动应用并挂载
  // vue应用主要逻辑及视图
  const { bootstrap } = await import('./bootstrap');
  await bootstrap();

  // 移除并销毁loading
  unmountGlobalLoading();
}

initApplication();
