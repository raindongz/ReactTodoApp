import { TodoItem } from "../interfaces/model";
import React from "react";
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import {
  Button,
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
  handleTodoUpdate: (
      event: React.ChangeEvent<HTMLInputElement>,
      item: TodoItem
  ) => void;
  handleTodoRemove: (item: TodoItem) => void;
  handleTodoComplete: (item: TodoItem) => void;
  handleMoveItemClick:(item:TodoItem)=>void;
}

const TodoItemView = (props: TodoItemViewInterface) => {
  // const [item, setItem] = useState<TodoItem>( props.item )
  const classes = useStyles();
  return (

    <Grid
      container
      spacing={1}
      className="todo-item"
    >
      <Grid className="todo-item-input-wrapper"
            item xs={5}>
        <TextField className="standard-basic"
          style={{
            textDecoration: props.item.completed ? "line-through" : undefined,
          }}
          value={props.item.content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.handleTodoUpdate(event, props.item)
          }
        />
      </Grid>
      <Grid item xs={5}>
        {props.item.completed ? (
          <Button
            variant="outlined"
            color="primary"
            className='complete-button'
            onClick={() =>
              props.handleTodoComplete(props.item)
            }
          >
            Completed
          </Button>
        ) : (
          <ColorButton
            variant="contained"
            color="primary"
            className='complete-button'
            onClick={() =>
                props.handleTodoComplete(props.item)
            }
          >
            Complete
          </ColorButton>
        )}
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="delete" className="item-remove">
          <DeleteIcon
            fontSize="small"
            className="delete-icon"
            onClick={() =>
              props.handleTodoRemove(props.item)
            }
          />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton className='move-item-button'>
          <PresentToAllIcon
                            fontSize="small"
                            onClick={()=>props.handleMoveItemClick(props.item)}
          />
        </IconButton>
      </Grid>
    </Grid>

  );
};

export default TodoItemView;
