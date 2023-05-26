class Application {
  constructor(app, config, logger = console) {
    this.app = app;
    this.config = config;
    this.logger = logger;
  }

  listen() {
    return this.app
      .listen(this.port, () => {
        this.logger.info(`Server is listening on port ${this.port}`);
      })
      .on("error", (err) => {
        console.error(">>>error", err);
        process.exit(1);
      });
  }

  get port() {
    return this.config.server.port;
  }
}

module.exports = Application;
