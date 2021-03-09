import { TodoItem } from "../interfaces/model";
import { useState } from "react";
import {
  Button,
  Checkbox,
  createMuiTheme,
  createStyles,
  Grid,
  IconButton,
  makeStyles, TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, purple } from "@material-ui/core/colors";

//for style of color button
const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={1}
      className="todo-item"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid className="todo-item-input-wrapper">
        <TextField id="standard-basic"
          style={{
            textDecoration: props.item.completed ? "line-through" : undefined,
          }}
          value={props.item.content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handleTodoUpdate(event, props.item.id, props.item.listId)
          }
        />
      </Grid>
      <Grid>
        {props.item.completed ? (
          <Button
            variant="outlined"
            color="primary"
            className={classes.margin}
            onClick={() =>
              props.handleTodoComplete(props.item.id, props.item.listId)
            }
          >
            Completed
          </Button>
        ) : (
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() =>
                props.handleTodoComplete(props.item.id, props.item.listId)
            }
          >
            Complete
          </ColorButton>
        )}
      </Grid>
      <Grid>
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
