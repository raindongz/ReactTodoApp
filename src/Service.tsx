import http from "./Httprequest";
import {TodoItem} from "./interfaces/model";

//List CRUD
const getAll = () => {
    return http.get("/lists");
};

const get = (id:string) => {
    return http.get(`/lists/${id}`);
};

const create = (newList:any) => {
    return http.post("/lists", newList);
};

const update = (newList:any) => {
    return http.put("/lists", newList);
};

const remove = (id:any) => {
    return http.delete(`/lists/${id}`);
};

const removeAll = () => {
    return http.delete(`/lists`);
};

//item CRUD
const createItem=(newItem:TodoItem)=>{
    return http.post(`/lists/${newItem.listId}/items`,newItem);
}
const updateItem=(newItem:TodoItem)=>{
    return http.put(`/lists/${newItem.listId}/items`,newItem);
}
const deleteItem=(listId:string, itemId:string)=> {
    return http.delete(`/lists/${listId}/items/${itemId}`);
}
const getAllItems=(listId:string)=>{
    return http.get(`/lists/${listId}/items`)
}
const moveItem=(listId:string, itemId:string, targetListId:string)=>{
return http.post(`/lists/${listId}/items/${itemId}?targetId=${targetListId}`);
}
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    createItem,
    updateItem,
    deleteItem,
    getAllItems,
    moveItem,
};