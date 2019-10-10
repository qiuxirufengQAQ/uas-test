module.exports = {
  devServer: {
    proxy: {
      "/session": {
        target: "http://gmf-uas:49002",
        changeOrigin: true
      }
    }
  },

  publicPath: "./",
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
};
