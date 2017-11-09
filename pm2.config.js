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
      name: "frontend",
      watch: [__dirname + "/ui/frontend"],
      ignore_watch: [
        __dirname + "/ui/frontend/build",
        __dirname + "/ui/frontend/.fusebox"
      ],
      script: "scripts/frontend.sh"
    },
    {
      name: "worker",
      watch: [__dirname + "/src"],
      script: "bin/worker.js",
      cwd: "./example",
      args: "queue.config.js --elastic",
      mode: "cluster",
      instances: 4
    }
  ]
};
