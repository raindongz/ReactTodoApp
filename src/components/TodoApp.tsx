import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import TodoListView from "./TodoListView";
import { TodoItem, TodoList } from "../interfaces/model";
import * as _ from "lodash";
//to install shortid 1:npm install. 2:npm install type 3:npm i --save-dev shortid@2.2.15
import shortid from "shortid";
import Todoform from "./Todoform";
import { Close } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ReactComponent } from "*.svg";
import SaveIcon from "@material-ui/icons/Save";
import PopupWindow from "../PopupWindow";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
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
  //handle popup window for Add new List
  const [showForAdd, setShowForAdd] = useState(false);
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
  }
  //create item
  function handleItemCreat(item: TodoItem, listId: string) {
    const newLists = _.cloneDeep(todoLists);
    if (item.content.trim() === "") {
      return;
    }
    newLists.find((list) => list.id === listId)!.items.push(item);
    setTodoLists(newLists);
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

  function changeListName(listName: string) {
    if (listName.trim() === "") {
      return;
    }
    const newLists = _.cloneDeep(todoLists);
    newLists.find((list) => list.id === currentListId)!.name = listName;
    setTodoLists(newLists);
    setShowForChange(false);
  }

  const deleteList = () => {
    const copyLists = _.cloneDeep(todoLists);
    const newLists = copyLists.filter((list) => list.id !== currentListId);
    setTodoLists(newLists);
    //set current tab

    //copy.splice( -1, 1 )
    //setTodoLists( copy )
  };
  //popup window stuff for add new list
  function windowPopupForAddList() {
    setShowForAdd(true);
  }
  //popup window for change listy name
  function windowPopupForChangeList() {
    setShowForChange(true);
  }
  //add new list
  const addNewList = (todoList: TodoList) => {
    if (todoList.name.trim() === "") {
      return;
    }
    setTodoLists([...todoLists, todoList]);
    setShowForAdd(false);
    //if only one list left then
    if (todoLists.length === 1) {
      setCurrentListId(todoLists[0].id);
    }
  };
  function handleClose() {
    setShowForAdd(false);
    setShowForChange(false);
  }

  //reset whole Application
  function resetApp(){
    setTodoLists([]);
  }
  //return statement starts here
  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          {showForAdd ? (
            <PopupWindow
              windowForAdd={true}
              handleClose={handleClose}
              addNewList={addNewList}
              changeListName={changeListName}
            />
          ) : null}
          {showForChange ? (
            <PopupWindow
              windowForAdd={false}
              handleClose={handleClose}
              addNewList={addNewList}
              changeListName={changeListName}
            />
          ) : null}
          <Grid container direction="row" spacing={9} justify="center">
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
                  <Button variant="outlined" onClick={windowPopupForAddList}>
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
            <Grid container direction="column" item xs={2} spacing={0}>
              <Grid>
                <Button
                  onClick={windowPopupForChangeList}
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Change Name
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  className="delete-button"
                  startIcon={<DeleteIcon />}
                  onClick={deleteList}
                >
                  Delete List
                </Button>
              </Grid>
              <Grid>
                <Button
                  className="reset-button"
                  variant="outlined"
                  color="secondary"
                  startIcon={<AlarmIcon />}
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
