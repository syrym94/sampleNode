module.exports = (app, { controllers, middlewares }) => {
  app.options("*", middlewares.cors);
  app.use(middlewares.cors);
  app.use(middlewares.cookieParsing);
  app.use(middlewares.bodyParsing);
  app.use(middlewares.logging);

  app.get("/statistics/count", controllers.statistics.count);
  app.get("/statistics/countByDate", controllers.statistics.countByDate);
  app.get("/statistics/countByRole", controllers.statistics.countByRole);
  app.get("/statistics/rate", controllers.statistics.rate);
  app.get("/statistics/rolesTable", controllers.statistics.rolesTable);
  app.get("/statistics/channelsTable", controllers.statistics.channelsTable);

  app.use(middlewares.noResourceFound);
  app.use(middlewares.errorHandling);
};
