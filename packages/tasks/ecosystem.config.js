module.exports = {
  apps: [
    {
      script: './dist/index.js',
      name: 'schedule-task',
      args: '--port 5200',
    },
  ],
};
