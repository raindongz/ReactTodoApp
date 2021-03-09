import { TodoItem } from "../interfaces/model";
import { useState } from "react";
import { Checkbox, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

interface TodoItemViewInterface {
  item: TodoItem;
  handleTodoComplete: (itemId: string, listId: string) => void;
  handleTodoUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    listId: string
  ) => void;
  handleTodoRemove: (itemId: string, listId: string) => void;
}

const TodoItemView = (props: TodoItemViewInterface) => {
  // const [item, setItem] = useState<TodoItem>( props.item )

  return (
    <Grid
      container
      spacing={1}
      className="todo-item"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
      >
        <Checkbox
          tabIndex={-1}
          disableRipple
          checked={props.item.completed}
          onClick={() =>
            props.handleTodoComplete(props.item.id, props.item.listId)
          }
        />
      </Grid>
      <Grid className="todo-item-input-wrapper"
            >
        <input
          style={{
            textDecoration: props.item.completed ? "line-through" : undefined,
          }}
          value={props.item.content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handleTodoUpdate(event, props.item.id, props.item.listId)
          }
        />
      </Grid>
      <Grid
         >
        <IconButton aria-label="delete" className="item-remove">
          <DeleteIcon
            fontSize="small"
            className="delete-icon"
            onClick={() =>
              props.handleTodoRemove(props.item.id, props.item.listId)
            }
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default TodoItemView;
