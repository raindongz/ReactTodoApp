import { TodoItem, TodoList } from "../interfaces/model";
import TodoItemView from "./TodoItemView";
import {Button, Checkbox, createStyles, Grid, GridList, List, makeStyles, Theme} from "@material-ui/core";
import React, { useState } from "react";
import _ from "lodash";
import SaveIcon from "@material-ui/icons/Save";
//grid list style
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 720,
            height: 500,
        },
    }),
);
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
    const classes = useStyles();
  return (
    <div className='todo-list-view'>
      <GridList className={classes.gridList}>
          <Grid>
          {props.todoList.items.map((item, index) => (
              <TodoItemView
                item={item}
                handleTodoComplete={props.handleTodoComplete}
                handleTodoUpdate={props.handleTodoUpdate}
                handleTodoRemove={props.handleTodoRemove}
              />
          ))}

          </Grid>
      </GridList>

    </div>
  );
};

export default TodoListView;
