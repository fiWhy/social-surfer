import { ADD_DATA, REMOVE_DATA, REMOVE_ELEMENT } from "../types";

export default function (state = [], action) {
    switch (action.type) {
        case ADD_DATA:
            return [...action.data];
        case REMOVE_DATA:
            return [];
        case REMOVE_ELEMENT:
            const data = state.slice();
            data.splice(state.findIndex(action.data), 1);
            return [...data];
        default:
            return state;
    }
}