import React from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { TodoItem, TodoList } from "../interfaces/model";
import shortid from "shortid";

interface TodoformViewInterface {
  todoList: TodoList;
  handleItemCreate: (item: TodoItem, listId: string) => void;
}
const TodoFormView = (props: TodoformViewInterface) => {
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
      id: shortid.generate(),
      content: inputState,
      completed: false,
      listId: props.todoList.id,
    };
    //call the TodoApp to creat the item
    props.handleItemCreate(newItem, props.todoList.id);
    // Reset the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    setInputState("");
  }
  return (
    <div className="todo-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter new todo"
        onChange={(event) => handleInputChange(event)}
      />
      <Button
        onClick={() => handleInputEnter()}
        variant="outlined"
        color="primary"
        size="small"
        type="submit"
      >
        Add Item
      </Button>
    </div>
  );
};
export default TodoFormView;
