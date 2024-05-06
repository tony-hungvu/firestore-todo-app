import Router from 'koa-router';
import bookHandler from '../handlers/books.handler';

// Prefix all routes with /books
const router = new Router({
  prefix: '/api',
});

router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBookById);
router.post('/books', bookHandler.createdBook);
router.delete('/books/:id', bookHandler.deletedBook);
router.put('/books/:id', bookHandler.updatedBook);

export default router;
