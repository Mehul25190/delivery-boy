// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const order = (state = initialState.auth, action) => {
    switch (action.type) {

        case ActionTypes.ORDERLIST: {
            return {
                ...state,
                orderlist: action.data
            }
        }
        case ActionTypes.ORDERDETAILS: {
            return {
                ...state,
                orderdetails: action.data,
            }
        }
        case ActionTypes.ORDERITEMS: {
            return {
                ...state,                
                orderItems: action.data,
            }
        }
        case ActionTypes.ORDERSTATUS: {
            return {
                ...state,                
                updatestatus: action.data,
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default order;