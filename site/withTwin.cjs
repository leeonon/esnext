// eslint-disable-next-line @typescript-eslint/no-var-requires
/*
 * @Description: 在 Nextjs 中使用 twin 宏和 Emotion 的配置
 * example - https://github.com/ben-rogerson/twin.examples/blob/master/next-emotion/README.md
 * discussions - https://github.com/ben-rogerson/twin.macro/discussions/826
 * emotion app dir - https://github.com/emotion-js/emotion/issues/2928
 */
const path = require("path");

// 包含导入twin.macro的文件的文件夹
const includedDirs = [
  path.resolve(__dirname, "app"),
  path.resolve(__dirname, "src"),
];

module.exports = function withTwin(
  /** @type {import("next").NextConfig}} */ nextConfig,
) {
  return {
    ...nextConfig,
    /**
     * 复写webpack配置
     * @param {{ module: { rules?: any; }; resolve: { fallback: any; }; }} config
     * @param {{ dir: string; dev: boolean; isServer: boolean; buildId: string; config: any; defaultLoaders: { babel: any }; totalPages: number; webpack: any;nextRuntime?: 'nodejs' | 'edge'; }} options
     */
    webpack(config, options) {
      const { dev, isServer } = options;
      // 使 loader 与新的 app dir 目录配合工作
      const patchedDefaultLoaders = options.defaultLoaders.babel;
      patchedDefaultLoaders.options.hasServerComponents = false;
      patchedDefaultLoaders.options.hasReactRefresh = false;

      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      /**
       * 添加新的 tsx、ts 处理规则
       * 添加 babel-plugin-macros、@emotion/babel-plugin 插件
       */
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          patchedDefaultLoaders,
          {
            loader: "babel-loader",
            options: {
              sourceMaps: dev,
              plugins: [
                require.resolve("babel-plugin-macros"),
                require.resolve("@emotion/babel-plugin"),
                [
                  require.resolve("@babel/plugin-syntax-typescript"),
                  { isTSX: true },
                ],
              ],
            },
          },
        ],
      });

      /**
       * 处理非服务器环境的情况
       * 当在客户端构建时（!isServer），修改 config.resolve.fallback 来指定一些 Node.js 原生模块的替代品，防止 Webpack 报错。
       */
      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      /**
       * 调用用户自定义的 Webpack 配置
       * 如果用户在 nextConfig 中提供了自己的 webpack 配置函数，那么调用它，并传递当前的 config 和 options。
       */
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
};
