import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el Mundo');

const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer(
  state = estadoInicial,
  action: fromTodo.Acciones
): Todo[] {
  switch (action.type) {
    case fromTodo.AGREGAR_TODO:
      const todo = new Todo(action.texto);
      return [...state, todo];

    case fromTodo.TOGGLE_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          };
        } else {
          return todoEdit;
        }
      });

    case fromTodo.EDITAR_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            texto: action.texto
          };
        } else {
          return todoEdit;
        }
      });

    case fromTodo.BORRAR_TODO:
      return state.filter(todoEdit => todoEdit.id !== action.id);

    case fromTodo.TOGGLE_ALL_TODO:
      return state.map(todoEdit => {
        return {
          ...todoEdit,
          completado: action.completado
        };
      });

    case fromTodo.BORRAR_ALL_TODO:
      return state.filter(todoEdit => !todoEdit.completado);

    default:
      return state;
  }
}
