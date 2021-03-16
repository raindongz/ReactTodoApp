import { TodoItem, TodoList } from "../interfaces/model";
import TodoItemView from "./TodoItemView";
import { createStyles, Grid, GridList, List, makeStyles, Theme} from "@material-ui/core";
import React, { useState } from "react";
import Todoform from "./Todoform";
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
  todoListItems: TodoItem[],
  listIndex: number;
  changeListName: (newName: string, listId: string) => void;
  handleTodoUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: TodoItem
  ) => void;
  handleTodoRemove: (item: TodoItem) => void;
  handleTodoComplete: (item: TodoItem) => void;
  handleItemCreate: (item: TodoItem) => void;
  handleMoveItemClick:(item:TodoItem)=>void;
}

const TodoListView = (props: TodoListViewInterface) => {
    const classes = useStyles();
  return (
    <div className='todo-list-view'>
    <Todoform
        todoList={props.todoList}
        handleItemCreate={props.handleItemCreate}
    />
      <GridList className={classes.gridList}>
          <Grid>
          {props.todoListItems.map((item, index) => (
              <TodoItemView key={item.id}
                item={item}
                handleTodoComplete={props.handleTodoComplete}
                handleTodoUpdate={props.handleTodoUpdate}
                handleTodoRemove={props.handleTodoRemove}
                            handleMoveItemClick={props.handleMoveItemClick}
              />
          ))}

          </Grid>
      </GridList>

    </div>
  );
};

export default TodoListView;
