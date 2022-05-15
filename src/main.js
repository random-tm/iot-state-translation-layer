import Koa from "koa";
import bodyParser from "koa-bodyparser";
import config from "./config/index.js";
import routes from "./routes.js";

const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
    routes(ctx);
});

app.listen(config.localport);