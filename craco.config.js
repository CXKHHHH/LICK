const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    port: 4000,
    client: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://47.95.13.131:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}; //跨域
