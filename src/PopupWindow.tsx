import React from "react";
import { Button, Grid, Icon } from "@material-ui/core";
import shortid from "shortid";
import { TodoList } from "./interfaces/model";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

interface WindowInterface {
  windowForAdd: boolean;
  addNewList: (todoList: TodoList) => void;
  handleClose: () => void;
  changeListName: (name: string) => void;
}
const PopupWindow = (props: WindowInterface) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = React.useState("");
  function handleListNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputState(event.target.value);
  }
  function handleSubmit() {
    //prepare the new list
    if (props.windowForAdd) {
      const newList = {
        id: shortid.generate(),
        name: inputState,
        items: [],
      };
      props.addNewList(newList);
      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    } else {
      props.changeListName(inputState);
      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    }
  }

  return (
    <div className="modal">
      <Grid container  direction="column" justify="center"
      >
        <Grid >Enter List Name:</Grid>
        <Grid className='window-input'>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter new todo"
            onChange={(event) => handleListNameInput(event)}
          />
        </Grid>
        <Grid>
          <Grid>
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              size="small"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              className="cancel-button"
              onClick={props.handleClose}
            >
              close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PopupWindow;
