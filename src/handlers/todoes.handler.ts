import { Context } from 'koa';
import todoRepository from '../share/todoRepository';

const getTodoes = async (ctx: Context) => {
  try {
    const todoes = await todoRepository.getAll();

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
    await todoRepository.deleted(id);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Todo deleted successfully',
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
    await todoRepository.deletedList(ids);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Todo list deleted successfully',
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
    await todoRepository.updated(id);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `Todo updated successfully with id: ${id}`,
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
    await todoRepository.updatedList(ids);

    ctx.status = 200;
    ctx.body = {
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
