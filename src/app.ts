import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import routes from './routes/routes';

const app = new Koa();
app.use(cors());
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
