import Koa from 'koa';
import koaBody from 'koa-body';
import routes from './routes/routes';

const app = new Koa();

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(3000);
