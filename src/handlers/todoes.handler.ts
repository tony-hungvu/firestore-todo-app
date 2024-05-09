import { Context } from 'koa';
import todoRepository from '../share/todoRepository';

const getTodoes = async (ctx: Context) => {
  try {
    const { limit, sort } = ctx.query;
    const todoes = await todoRepository.getAll({ limit, sort });
    ctx.body = {
      data: todoes,
    };
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

const getTodoById = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const todo = await todoRepository.getById(id);

    ctx.body = {
      data: todo,
    };
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

const createdTodo = async (ctx: any) => {
  try {
    const postData = ctx.request.body;
    const todoes = await todoRepository.created(postData);

    ctx.body = {
      success: true,
      todoes,
    };
  } catch (error) {
    throw error;
  }
};
const deletedTodo = async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const deletedTodo = await todoRepository.deleted(id);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Todo deleted successfully',
      deletedTodo,
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

const deletedTodoList = async (ctx: any) => {
  const { ids } = ctx.request.body;
  try {
    const deletedTodoList = await todoRepository.deletedList(ids);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Todo list deleted successfully',
      deletedTodoList,
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

const updatedTodo = async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    const updatedTodo = await todoRepository.updated(id);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `Todo updated successfully with id: ${id}`,
      updatedTodo,
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

const updatedTodoList = async (ctx: any) => {
  const { ids } = ctx.request.body;
  try {
    const updatedList = await todoRepository.updatedList(ids);

    ctx.status = 200;
    ctx.body = {
      updatedList,
      success: true,
      message: `Todo list updated successfully with id: ${ids}`,
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

export default {
  getTodoes,
  getTodoById,
  createdTodo,
  deletedTodo,
  updatedTodo,
  deletedTodoList,
  updatedTodoList,
};
