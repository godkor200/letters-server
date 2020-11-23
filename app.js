const koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
require("dotenv").config();
const path = require("path");
const app = new koa();
const router = new Router();
const api = require("./src/api");
const port = process.env.PORT || 4001;
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const fs = require("fs");
const indexHtml = fs.readFileSync(
  path.resolve(__dirname, "./public/index.html"),
  { encoding: "utf8" }
);
/*-----------------------------------------------------*/
app.use(cors());
// logger
app.use(bodyParser());
// server side
app.use(serve(path.resolve(__dirname, "./public")));
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
// db connection
const uri =
  "mongodb+srv://admin:13241324@cluster0.etwug.mongodb.net/letters?retryWrites=true&w=majority";
mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Successfully connected to mongodb");
  })
  .catch((e) => {
    console.error(e);
  });

// response
app.use((ctx) => {
  ctx.body = indexHtml;
});

router.get("/", (ctx, next) => {
  ctx.body = "Home";
  console.log("ctx.body", ctx.body);
});

router.use("/api", api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});
