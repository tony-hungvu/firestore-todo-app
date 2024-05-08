import Router from 'koa-router';
import todoHander from '../handlers/todoes.handler';

const router = new Router({
  prefix: '/api',
});

router.get('/todoes', todoHander.getTodoes);
router.get('/todoes/:id', todoHander.getTodoById);
router.post('/todoes', todoHander.createdTodo);
router.delete('/todoes/:id?', todoHander.deletedTodo);
router.post('/todoes/deleteTodoList', todoHander.deletedTodoList);
router.put('/todoes/updateTodoList', todoHander.updatedTodoList);
router.put('/todoes/:id', todoHander.updatedTodo);

export default router;
