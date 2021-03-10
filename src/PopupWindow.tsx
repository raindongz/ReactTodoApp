import React from "react";
import {Button, Grid, Icon, TextField} from "@material-ui/core";
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
      <Grid container justify="center"
            alignItems="center" spacing={1}
      >
        <Grid className='window-input' >
          <TextField id="standard-basic" label="Enter List Name: "
            ref={inputRef}
            type="text"
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleListNameInput(event)}
          />
        </Grid>
          <Grid item xs={1}>
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
          <Grid item xs={1}>
            <Button
                variant="contained"
                color="default"
                size="small"
                type="submit"
              onClick={props.handleClose}
            >
              close
            </Button>
          </Grid>
      </Grid>
    </div>
  );
};

export default PopupWindow;
