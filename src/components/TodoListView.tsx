import {TodoItem, TodoList} from "../interfaces/model";
import TodoItemView from "./TodoItemView";
import {Button, Checkbox, Grid} from "@material-ui/core";
import {useState} from "react";
import _ from "lodash";

interface TodoListViewInterface {
    todoList: TodoList
    listIndex: number
    changeListName: ( index: number, newName: string ) => void
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove:(id:string)=>void;
    handleTodoComplete:(id:string)=>void;
}

const TodoListView = ( props: TodoListViewInterface ) => {

    return (
        <div>
            {props.todoList.items.map( ( item, index ) => (
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
            ) )}

            <Button onClick={() => {
                props.changeListName( props.listIndex, `newName ${props.listIndex + 1}` )
            }}>
                Change Name
            </Button>
        </div>
    )
}

export default TodoListView