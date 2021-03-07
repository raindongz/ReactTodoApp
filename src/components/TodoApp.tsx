import React, { useState } from "react";
import { Box, Button, makeStyles, Tab, Tabs, Theme, Typography } from "@material-ui/core";
import TodoListView from "./TodoListView";
import { TodoList } from "../interfaces/model";
import * as _ from "lodash";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel( props: TabPanelProps ) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps( index: any ) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles( ( theme: Theme ) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}) );

export default function TodoApp() {
    const classes = useStyles();

    function handleTodoComplete(id:string){
        const newList=todoLists;
        newList.items.find((item)=>item.id===id)!.completed= !todoLists[index].items.find((item)=>item.id===id)!.completed;
        setList(newList);
    }
    function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string){
        const newList:TodoList= list;
        newList.items.find((item)=>item.id===id)!.content=event.target.value;
        setList(newList);
    }

    function handleTodoRemove(id:string){
        const newList:TodoList=list;
        newList.items= list.items.filter((item)=>item.id!==id);
        setList(newList);
    }
    //
    const [todoLists, setTodoLists] = useState<TodoList[]>( [{
        id: "1",
        name: "List 1",
        items: [{
            id: "1",
            content: "item 1-1",
            completed: false
        },
            {
                id: "2",
                content: "item 1-2",
                completed: false
            }
            ,
            {
                id: "3",
                content: "item 1-3",
                completed: false
            }]
    }, {
        id: "2",
        name: "List 2",
        items: [{
            id: "1",
            content: "item 2-1",
            completed: false
        },
            {
                id: "2",
                content: "item 2-2",
                completed: false
            }
            ,
            {
                id: "3",
                content: "item 2-3",
                completed: false
            }]
    }] );
    const [selected, setSelected] = useState( 0 );

    const handleChange = ( event: React.ChangeEvent<{}>, newValue: number ) => {
        setSelected( newValue );
    }

    function changeListName( listIndex: number, newName: string ) {
        const copy = _.cloneDeep( todoLists )
        const list = copy[ listIndex ]
        list.name = newName
        setTodoLists( copy )
    }

    const deleteList = () => {
        const copy = _.cloneDeep( todoLists )
        copy.splice( -1, 1 )
        setTodoLists( copy )
    }

    const addNewList = () => {
        const item = {
            id: "3",
            name: "List 3",
            items: [{
                id: "1",
                content: "item 3-1",
                completed: false
            },
                {
                    id: "2",
                    content: "item 3-2",
                    completed: false
                }
                ,
                {
                    id: "3",
                    content: "item 3-3",
                    completed: false
                }]
        }
        setTodoLists( [...todoLists, item] );
    };

    return (
        <div className={classes.root}>
            <Tabs orientation="vertical" variant="scrollable" value={selected} onChange={handleChange} className={classes.tabs}>
                {todoLists.map( ( todoList ) => (
                    <Tab label={todoList.name} {...a11yProps( 0 )}/>
                ) )}
                <Button variant="outlined" onClick={addNewList}> + </Button>
            </Tabs>
            {todoLists.map( ( todoList, index ) => (
                <TabPanel index={index} value={selected}>
                    <TodoListView
                        todoList={todoList}
                        listIndex={index}
                        changeListName={changeListName}/>
                </TabPanel>
            ) )}

            <Button onClick={deleteList}> DELETE LIST</Button>
        </div>
    )
}