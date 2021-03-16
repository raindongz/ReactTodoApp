export interface TodoItem {
    id: string,
    content: string,
    completed: boolean,
    listId:string,
    userId:string,
    createdDate:Date,
    lastModifiedDate:Date,
}

export interface TodoList {
    listId: string,
    listName: string,
    userId:string,
    items: string[]
}
