import { TodoItem, TodoList } from "../interfaces/model";
import TodoItemView from "./TodoItemView";
import { Button, Checkbox, Grid } from "@material-ui/core";
import React, { useState } from "react";
import _ from "lodash";
import SaveIcon from "@material-ui/icons/Save";

interface TodoListViewInterface {
  todoList: TodoList;
  listIndex: number;
  changeListName: (newName: string, listId: string) => void;
  handleTodoUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    listId: string
  ) => void;
  handleTodoRemove: (itemId: string, listId: string) => void;
  handleTodoComplete: (itemId: string, listId: string) => void;
}

const TodoListView = (props: TodoListViewInterface) => {
  return (
    <div>
      <Grid
      >
        <Grid>
          {props.todoList.items.map((item, index) => (
            <div>
              <div>
                <TodoItemView
                  item={item}
                  handleTodoComplete={props.handleTodoComplete}
                  handleTodoUpdate={props.handleTodoUpdate}
                  handleTodoRemove={props.handleTodoRemove}
                />
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoListView;
