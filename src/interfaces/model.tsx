export interface TodoItem {
    id: string,
    content: string,
    completed: boolean
}

export interface TodoList {
    id: string,
    name: string,
    items: TodoItem[]
}
