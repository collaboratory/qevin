const { FuseBox, BabelPlugin } = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src/",
  output: "build/$name.js",
  plugins: [BabelPlugin()],
  target: "browser"
});

fuse
  .bundle("vendor")
  .instructions("~ app.js")
  .hmr()
  .watch();
fuse
  .bundle("app")
  .instructions("!> [app.js]")
  .hmr()
  .watch();
fuse.dev({
  proxy: {
    "/api": {
      target: "http://localhost:3000/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    }
  }
});
fuse.run();
