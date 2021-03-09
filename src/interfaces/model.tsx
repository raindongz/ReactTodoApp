export interface TodoItem {
    id: string,
    content: string,
    completed: boolean,
    listId:string,
}

export interface TodoList {
    id: string,
    name: string,
    items: TodoItem[]
}
