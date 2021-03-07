import { TodoItem } from "../interfaces/model";
import { useState } from "react";
import {Checkbox, Grid, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoItemViewInterface {
    item: TodoItem
    handleTodoComplete:(id:string)=>void;
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove:(id:string)=>void;
}

const TodoItemView = ( props: TodoItemViewInterface ) => {
    const [item, setItem] = useState<TodoItem>( props.item )

    function handleClick() {
        // props.item = {id: "new", content: "new", completed: false}
        setItem( { id: "new", content: "new", completed: false } )
    }


    return (
        <Grid>
            <Grid>
                <div>
                    <Checkbox tabIndex={-1} disableRipple
                              checked={item.completed}
                              onClick={() => props.handleTodoComplete(item.id)}
                    />
                </div>
            </Grid>
            <Grid className="todo-item-input-wrapper">
                <input
                    style={{textDecoration: props.item.completed? "line-through": undefined}}
                    value={props.item.content}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.item.id)}
                />
            </Grid>
            <Grid >
                <IconButton aria-label="delete"
                            className="item-remove"
                >
                    <DeleteIcon
                        fontSize="small"
                        className='delete-icon'
                        onClick={() => props.handleTodoRemove(props.item.id)}/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default TodoItemView;