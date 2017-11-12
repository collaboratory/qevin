module.exports = {
  apps: [
    {
      name: "backend",
      script: "ui/backend/api/index.js",
      watch: [__dirname + "/ui/backend"],
      env: {
        NODE_ENV: "development",
        NODE_PATH: __dirname
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "worker",
      watch: [__dirname + "/src"],
      script: "bin/worker.js",
      cwd: "./example",
      args: "queue.config.js --elastic"
    },
    {
      name: "frontend",
      watch: [__dirname + "/src"],
      script: "fuse.js",
      cwd: "./ui/frontend"
    }
  ]
};
