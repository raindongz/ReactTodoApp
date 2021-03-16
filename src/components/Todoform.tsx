import React from "react";
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { TodoItem, TodoList } from "../interfaces/model";
import TextField from "@material-ui/core/TextField";

interface TodoformViewInterface {
  todoList: TodoList;
  handleItemCreate: (item: TodoItem, listId: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
  })
);
const TodoFormView = (props: TodoformViewInterface) => {
  const classes = useStyles();
  // Create ref for form input
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = React.useState("");

  // Handle todo input change
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update form state with the text from input
    setInputState(event.target.value);
  }
  function handleInputEnter() {
    //create new item
    const newItem: TodoItem = {
      id: "",
      content: inputState,
      completed: false,
      listId: props.todoList.listId,
      userId:'RUNDONG',
      createdDate: new Date(),
      lastModifiedDate: new Date(),
    };
    //call the TodoApp to creat the item
    props.handleItemCreate(newItem, props.todoList.listId);
    // Reset the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    setInputState("");
  }
  return (
    <div className="todo-form">
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
              inputRef={inputRef}
            className="outlined-basic"
            label="Enter New Item"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event)
            }
          />
        </Grid>
        <Grid item xs>
          <Button
            className="add-item-button"
            onClick={() => handleInputEnter()}
            variant="outlined"
            color="primary"
            size="small"
            type="submit"
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default TodoFormView;
