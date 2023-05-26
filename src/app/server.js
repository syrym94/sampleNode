require("module-alias/register");
const cron = require("node-cron");
const { postRejectedClearService } = require("@services");

cron.schedule("0 * * * *", async () => {
  try {
    const updatedRows = await postRejectedClearService.call();
    console.log(updatedRows);
  } catch (e) {
    console.error(e);
  }
});

const app = require("./index");

app.listen();
