import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  GridList,
  List,
  ListItem,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import TodoListView from "./TodoListView";
import { TodoItem, TodoList } from "../interfaces/model";
import * as _ from "lodash";
//to install shortid 1:npm install. 2:npm install -D @types/module-name  3:npm i --save-dev shortid@2.2.15
import shortid from "shortid";
import Todoform from "./Todoform";
import { Close } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ReactComponent } from "*.svg";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CachedIcon from "@material-ui/icons/Cached";
//import snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

//snackbar function and style
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//tab and panel declaration staff
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

//Todo APP start here
export default function TodoApp() {
  //popup window stuff
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = React.useState("");
  function handleListNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputState(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleDialogSwitchOrAdd() {
    if (showForChange) {
      changeListName(inputState);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    } else {
      const newList = {
        id: shortid.generate(),
        name: inputState,
        items: [],
      };
      addNewList(newList);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    }
  }
  //handle popup window for list name change
  const [showForChange, setShowForChange] = useState(false);

  const classes = useStyles();
  //get item in local storage
  const localItems = JSON.parse(localStorage.getItem("lists") || "{}");
  const [todoLists, setTodoLists] = useState<TodoList[]>([] || localItems);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("lists") || "{}");
    if (localItems) {
      setTodoLists(localItems);
    }
  }, []);
  //store lists in localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todoLists));
  }, [todoLists]);

  //Item CRUD starts here
  //complete item
  //item snack bar
  const [ItemSnackBarOpen, setItemSnackbarOpen] = React.useState(false);
  const [NewItemSnackBar, setNewItemSnakeBar] = React.useState(false);
  const ItemDeleteSnackBar = () => {
    setNewItemSnakeBar(false);
    setItemSnackbarOpen(true);
  };
  const ItemDeleteSnackBarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setItemSnackbarOpen(false);
  };
  //new item snack bar
  const NewItemSnackBarOpen = () => {
    setItemSnackbarOpen(false);
    setNewItemSnakeBar(true);
  };
  const handleNewItemClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNewItemSnakeBar(false);
  };

  function handleTodoComplete(itemId: string, listId: string) {
    const newLists = _.cloneDeep(todoLists);
    newLists
      .find((list) => list.id === listId)!
      .items.find((item) => item.id === itemId)!.completed = !todoLists
      .find((list) => list.id === listId)!
      .items.find((item) => item.id === itemId)!.completed;
    setTodoLists(newLists);
  }
  //update item
  function handleTodoUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    listId: string
  ) {
    const newLists = _.cloneDeep(todoLists);
    newLists
      .find((list) => list.id === listId)!
      .items.find((item) => item.id === itemId)!.content = event.target.value;
    //newList.items.find((item)=>item.id===id)!.content=event.target.value;

    setTodoLists(newLists);
  }
  //remove item
  function handleTodoRemove(itemId: string, listId: string) {
    const newLists = _.cloneDeep(todoLists);
    newLists.find((list) => list.id === listId)!.items = newLists
      .find((list) => list.id === listId)!
      .items.filter((item) => item.id !== itemId);
    //newList.items= list.items.filter((item)=>item.id!==id);
    setTodoLists(newLists);
    ItemDeleteSnackBar();
  }
  //create item
  function handleItemCreat(item: TodoItem, listId: string) {
    const newLists = _.cloneDeep(todoLists);
    if (item.content.trim() === "") {
      return;
    }
    newLists.find((list) => list.id === listId)!.items.push(item);
    setTodoLists(newLists);
    NewItemSnackBarOpen();
  }

  //List CRUD start here
  //selected is for current tab and panel, currentList Id is for select the list with clicking the tab
  const [selected, setSelected] = useState(0);
  const [currentListId, setCurrentListId] = useState("");
  //switching selected tab
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };
  //select current list by clicking tab
  const handleSelect = (listId: string) => {
    setCurrentListId(listId);
  };

  function setChangeListName() {
    setShowForChange(true);
    setOpen(true);
    handleDialogSwitchOrAdd();
  }

  function changeListName(listName: string) {
    if (listName.trim() === "") {
      return;
    }
    const newLists = _.cloneDeep(todoLists);
    newLists.find((list) => list.id === currentListId)!.name = listName;
    setTodoLists(newLists);
    setShowForChange(false);
    setOpen(false);
  }

  const deleteList = () => {
    const copyLists = _.cloneDeep(todoLists);
    const newLists = copyLists.filter((list) => list.id !== currentListId);
    setTodoLists(newLists);
    //set current tab

    //copy.splice( -1, 1 )
    //setTodoLists( copy )
  };

  //add new list
  const addNewList = (todoList: TodoList) => {
    if (todoList.name.trim() === "") {
      return;
    }
    setTodoLists([...todoLists, todoList]);
    setOpen(false);
    //if only one list left then
    if (todoLists.length === 1) {
      setCurrentListId(todoLists[0].id);
    }
  };

  function handleClose() {
    setOpen(false);
    setShowForChange(false);
  }

  //reset whole Application
  function resetApp() {
    setTodoLists([]);
    setShowForChange(false);
    setOpen(false);
  }
  //return statement starts here
  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Snackbar
            open={NewItemSnackBar}
            autoHideDuration={6000}
            onClose={handleNewItemClose}
          >
            <Alert onClose={handleNewItemClose} severity="success">
              Successfully created Item!
            </Alert>
          </Snackbar>
          <Snackbar
            open={ItemSnackBarOpen}
            autoHideDuration={6000}
            onClose={ItemDeleteSnackBarClose}
          >
            <Alert onClose={ItemDeleteSnackBarClose} severity="warning">
              Delete item successful!
            </Alert>
          </Snackbar>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Change List Name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  ref={inputRef}
                  margin="dense"
                  id="name"
                  label="Enter List Name"
                  type="email"
                  fullWidth
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleListNameInput(event)
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogSwitchOrAdd} color="primary">
                  Submit
                </Button>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Grid>
            <h1 className="title">Todo App</h1>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <AppBar position="static" color="default">
                <Tabs
                  value={selected}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {todoLists.map((todoList, index) => (
                    <Tab
                      label={todoList.name}
                      {...a11yProps(index)}
                      onClick={() => handleSelect(todoList.id)}
                    />
                  ))}
                  <Button variant="outlined" onClick={handleClickOpen}>
                    {" "}
                    +{" "}
                  </Button>
                </Tabs>
              </AppBar>

              {todoLists.map((todoList, index) => (
                <TabPanel index={index} value={selected}>
                  <Todoform
                    todoList={todoList}
                    handleItemCreate={handleItemCreat}
                  />
                  <TodoListView
                    todoList={todoList}
                    listIndex={index}
                    changeListName={changeListName}
                    handleTodoComplete={handleTodoComplete}
                    handleTodoUpdate={handleTodoUpdate}
                    handleTodoRemove={handleTodoRemove}
                  />
                </TabPanel>
              ))}
            </Grid>
            <Grid container item xs={2}>
              <Grid item xs>
                <Button
                  size="large"
                  className="change-list-button"
                  onClick={setChangeListName}
                  variant="contained"
                  color="primary"
                  startIcon={<BorderColorIcon />}
                >
                  Change Name
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  className="delete-button"
                  startIcon={<DeleteIcon />}
                  onClick={deleteList}
                >
                  Delete List
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  size="large"
                  className="reset-button"
                  variant="outlined"
                  color="secondary"
                  startIcon={<CachedIcon />}
                  onClick={resetApp}
                >
                  Reset App
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
}
