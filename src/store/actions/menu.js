import { ADD_DATA } from "../types";

export const add = (data = []) => ({
    data,
    type: ADD_DATA
})