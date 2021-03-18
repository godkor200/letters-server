const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const app = new koa();
const router = new Router();
const api = require('./src/api');
const port = process.env.PORT || 4001;
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

/*-----------------------------------------------------*/

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
// db connection
const uri =
  'mongodb+srv://admin:13241324@cluster0.etwug.mongodb.net/letters?retryWrites=true&w=majority';
mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log('Successfully connected to mongodb');
  })
  .catch((e) => {
    console.error(e);
  });

// response
// app.use((ctx) => {
//   ctx.body = indexHtml;
// });

router.get('/', (ctx, next) => {
  ctx.body = 'Home';
  console.log('ctx.body', ctx.body);
});

router.use('/api', api.routes());

app.listen(port, () => {
  console.log(`app is listening in PORT ${port}`);
});
