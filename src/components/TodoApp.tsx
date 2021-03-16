import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  DialogContentText,
  Grid,
  makeStyles,
  RadioGroup,
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

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CachedIcon from "@material-ui/icons/Cached";
//import snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import AppService from "../Service";
import TodoItemView from "./TodoItemView";

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
//tabpanel style
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
//for matching tab and panel
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
  const classes = useStyles();
  //initialize the app with empty lists, todoList is set of lists
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  //dialog for list name already exist pop up window
  const [listExistWindowOpen, setListExistWindowOpen] = useState(false);

  //popup window for change list name and add new list
  const [open, setOpen] = React.useState(false);

  //input for change List name and add newList
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputState, setInputState] = React.useState("");

  //variable for switch list name change model and add new list model
  const [showForChange, setShowForChange] = useState(false);

  //selected is for current tab and panel, currentList Id is for select the list with clicking the tab
  const [selected, setSelected] = useState(0);

  //current List user is viewing
  const [currentList, setCurrentList] = useState<TodoList>();

  //current Items user is viewing
  const [currentListItems, setCurrentListItems] = useState<TodoItem[]>([]);

  //item snack bar for delete & create & move item
  const [ItemSnackBarOpen, setItemSnackbarOpen] = React.useState(false);
  const [NewItemSnackBar, setNewItemSnakeBar] = React.useState(false);
  const [moveItemSnackBarOpen, setMoveItemSnackBarOpen] = useState(false);

  //variable for move item window open
  const [moveItemWindowOpen, setMoveItemWindowOpen] = useState(false);
  //selected item user want to move
  const [currentMoveItem, setCurrentMoveItem] = useState<TodoItem>();

  //Popup Windows functions
  //open the popup window for list name change and add new list
  const handleClickOpen = () => {
    setOpen(true);
  };

  //close the window for list already exist
  function listExistWindowClose() {
    setListExistWindowOpen(false);
  }

  //make the input state not refresh
  function handleListNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputState(event.target.value);
  }

  //dialog functions
  function handleClose() {
    setOpen(false);
    setShowForChange(false);
  }

  const ItemDeleteSnackBar = () => {
    setNewItemSnakeBar(false);
    setMoveItemSnackBarOpen(false);
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
    setMoveItemSnackBarOpen(false);
    setItemSnackbarOpen(false);
    setNewItemSnakeBar(true);
  };
  //close new item snackBar
  const handleNewItemClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNewItemSnakeBar(false);
  };
  //moveitem snack bars
  function handleMoveItemSnackBarOpen() {
    setNewItemSnakeBar(false);
    setItemSnackbarOpen(false);
    setMoveItemSnackBarOpen(true);
  }
  function handleMoveItemSnackBarClose() {
    setMoveItemSnackBarOpen(false);
  }

  // retrive the lists from database
  useEffect(() => {
    getAllLists();
  }, []);

  useEffect(() => {
    if (currentList) {
      getCurrentListItems();
    }
  }, [currentList?.listId]);

  function getCurrentListItems() {
    if (currentList) {
      AppService.getAllItems(currentList.listId).then((response) => {
        setCurrentListItems(response.data);
      });
    }
  }
  function getAllLists() {
    AppService.getAll()
      .then((response) => {
        const newLists = _.cloneDeep(response.data);

        setTodoLists(newLists);
        setCurrentList(newLists[0]);
        console.log(newLists);
      })
      .catch((e) => {
        console.log("errorrrrrrr");
      });
  }
  /*
  //get item in local storage
  const localItems = JSON.parse(localStorage.getItem("lists") || "{}");
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


 */
  //Item CRUD starts here
  //complete item
  function handleTodoComplete(item: TodoItem) {
    const listItems = _.cloneDeep(currentListItems);
    let found = listItems.find((obj) => obj.id === item.id);
    if (found) {
      found.completed = !found.completed;
    }
    AppService.updateItem(found!).then((response) => {
      found!.completed = response.data.completed;
      setCurrentListItems(listItems);
    });
  }
  //update item
  function handleTodoUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    item: TodoItem
  ) {
    const listItems = _.cloneDeep(currentListItems);
    let found = listItems.find((obj) => obj.id === item.id);
    if (found) {
      found.content = event.target.value;
    }
    AppService.updateItem(found!).then((response) => {
      found!.content = response.data.content;
      setCurrentListItems(listItems);
    });
  }
  //remove item
  function handleTodoRemove(item: TodoItem) {
    const listItems = _.cloneDeep(currentListItems);

    AppService.deleteItem(item.listId, item.id).then((response) => {
      if (response.data === true) {
        const found = listItems.find((obj) => obj.id === item.id);
        if (found) {
          const newListItems = listItems.filter((obj) => obj.id !== found.id);
          setCurrentListItems(newListItems);
          ItemDeleteSnackBar();
        }
      }
    });
  }

  //move Item to another list
  function handleMoveItemClick(item: TodoItem) {
    setMoveItemWindowOpen(true);
    setCurrentMoveItem(item);
  }
  function handleMoveItemWindowClose() {
    setMoveItemWindowOpen(false);
  }
  function handleMoveItemToList(targetList: TodoList) {
    AppService.moveItem(
      currentMoveItem!.listId,
      currentMoveItem!.id,
      targetList.listId
    )
      .then((response) => {
        if (response.data) {
          setCurrentListItems(
            currentListItems.filter((item) => item.id !== currentMoveItem!.id)
          );
          handleMoveItemSnackBarOpen();
        }
      })
      .catch((e) => console.log(e));
    setMoveItemWindowOpen(false);
  }

  //create item
  function handleItemCreate(item: TodoItem) {
    if (item.content.trim() === "") {
      return;
    }
    AppService.createItem(item).then((response) => {
      const currentListItemsClone = _.cloneDeep(currentListItems);
      const lists = _.cloneDeep(todoLists);

      const newItem = response.data;

      // add the item ID to the list's items refs
      lists.find((list) => list.listId === newItem.listId)!.items.push(newItem);

      // update currentListIems
      currentListItemsClone.push(newItem);
      setTodoLists(lists);
      setCurrentListItems(currentListItemsClone);
    });

    NewItemSnackBarOpen();
  }

  //List CRUD start here
  //this function is used to change list name and add new list if showForChange is
  // true then change list name, otherwise add new list
  function handleDialogSwitchOrAdd() {
    if (showForChange) {
      changeListName(inputState);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    } else {
      const newList = {
        listId: "",
        listName: inputState,
        userId: "RUNDONG",
        items: [],
      };
      if (newList.listName.trim() === "") {
        return;
      }
      //create list in backend
      AppService.create(newList)
        .then((response) => {
          addNewList(response.data);
        })
        .catch(() => {
          setOpen(false);
          setListExistWindowOpen(true);
        });

      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      setInputState("");
    }
  }

  //switching selected tab
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };
  //select current list by clicking tab
  const handleSelect = (list: TodoList) => {
    setCurrentList(list);
  };
  //set the popup window to change list name model
  function setChangeListName() {
    setOpen(true);
    setShowForChange(true);
  }
  //call database to change the list name
  function changeListName(listName: string) {
    if (currentList) {
      if (listName.trim() === "") {
        return;
      }
      const newLists = _.cloneDeep(todoLists);
      newLists.find(
        (list) => list.listId === currentList.listId
      )!.listName = listName;
      AppService.update(
        newLists.find((list) => list.listId === currentList.listId)!
      )
        .then((response) => {
          setTodoLists(newLists);
        })
        .catch(() => {
          setOpen(false);
          setListExistWindowOpen(true);
        });
      setShowForChange(false);
      setOpen(false);
    }
  }

  //call data base to delete list name
  const deleteList = () => {
    if (currentList) {
      const copyLists = _.cloneDeep(todoLists);
      AppService.remove(currentList.listId)
        .then((response) => {
          const newLists = copyLists.filter(
            (list) => list.listId !== currentList.listId
          );
          setTodoLists(newLists);
          setCurrentListItems([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //set current tab
    setSelected(0);
    setCurrentList(todoLists[0]);
    //copy.splice( -1, 1 )
    //setTodoLists( copy )
  };

  //add new list
  const addNewList = (todoList: TodoList) => {
    if (todoList.listName.trim() === "") {
      return;
    }
    setTodoLists([...todoLists, todoList]);
    setOpen(false);
    //if only one list left then
    if (todoLists.length === 1) {
      setCurrentList(todoLists[0]);
    }
  };

  //reset whole Application
  function resetApp() {
    AppService.removeAll().then().catch();
    setTodoLists([]);
    setCurrentListItems([]);
    setShowForChange(false);
    setOpen(false);
  }
  //return statement starts here
  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          {/*snackbar for move item to another list*/}
          <Snackbar
            open={moveItemSnackBarOpen}
            autoHideDuration={6000}
            onClose={handleMoveItemSnackBarClose}
          >
            <Alert onClose={handleMoveItemSnackBarClose} severity="info">
              Successfully moved Item!
            </Alert>
          </Snackbar>
          {/*snackbar for create new item*/}
          <Snackbar
            open={NewItemSnackBar}
            autoHideDuration={6000}
            onClose={handleNewItemClose}
          >
            <Alert onClose={handleNewItemClose} severity="success">
              Successfully created Item!
            </Alert>
          </Snackbar>
          {/*snackbar for delete existing item*/}
          <Snackbar
            open={ItemSnackBarOpen}
            autoHideDuration={6000}
            onClose={ItemDeleteSnackBarClose}
          >
            <Alert onClose={ItemDeleteSnackBarClose} severity="warning">
              Delete item successful!
            </Alert>
          </Snackbar>

          {/*move Item Window dialog*/}
          <div>
            <Dialog
              open={moveItemWindowOpen}
              onClose={handleMoveItemWindowClose}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                choose the list you want move to
              </DialogTitle>
              <DialogContent dividers>
                {todoLists.map((list) => (
                  <Button
                    onClick={() => {
                      handleMoveItemToList(list);
                    }}
                  >
                    {list.listName}
                  </Button>
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={handleMoveItemWindowClose}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* List name already exist dialog*/}
          <div>
            <Dialog
              open={listExistWindowOpen}
              onClose={listExistWindowClose}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                List name already exist
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please consider another List name
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={listExistWindowClose}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* Change List name dialog*/}
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
          {/* Todo Application title*/}
          <Grid>
            <h1 className="title">Todo App</h1>
          </Grid>
          <Grid container spacing={3}>
            {/* create Tabs by mapping each list in todoLists*/}
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
                      key={todoList.listId}
                      label={todoList.listName}
                      {...a11yProps(index)}
                      onClick={() => handleSelect(todoList)}
                    />
                  ))}
                  <Button variant="outlined" onClick={handleClickOpen}>
                    {" "}
                    +{" "}
                  </Button>
                </Tabs>
              </AppBar>
              {/* create panels by mapping each list in todoLists*/}
              {todoLists.map((todoList, index) => (
                <TabPanel index={index} value={selected}>
                  <TodoListView
                    key={todoList.listId}
                    todoListItems={currentListItems}
                    todoList={todoList}
                    listIndex={index}
                    changeListName={changeListName}
                    handleTodoComplete={handleTodoComplete}
                    handleTodoUpdate={handleTodoUpdate}
                    handleTodoRemove={handleTodoRemove}
                    handleItemCreate={handleItemCreate}
                    handleMoveItemClick={handleMoveItemClick}
                  />
                </TabPanel>
              ))}
            </Grid>
            {/* Change & Delete & Reset app Buttons*/}
            <Grid container item xs={2}>
              <Grid item xs>
                <Button
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
