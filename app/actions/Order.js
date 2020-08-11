import axios from '../utils/api';
import url from '../config/api';
import { ActionTypes, } from '../constants/';
import { showToast } from '../utils/common';

export const orderlist = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    return axios.get(url.orderlist
        + '?deliveryBoyId=' + payloads.deliveryBoyId + '&orderStatus=' + payloads.orderStatus
    )
        .then(res => {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            if (res.status == 200) {
                if (res.data.status == "success") {
                    dispatch({ type: ActionTypes.ORDERLIST, data: res.data.data.orderList });
                    return res.data
                }
                else {
                    showToast(res.data.message, "danger")
                    return res.data
                }
            } else {
                showToast(res.data.message, "danger")
                return res
            }
        }).catch(function (error) {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            console.log(url.orderlist, error.message)
            //showToast(error.message, "danger")
        });
}
export const Satrtorderlist = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    return axios.get(url.orderlist
        + '?deliveryBoyId=' + payloads.deliveryBoyId)
        .then(res => {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            if (res.status == 200) {
                if (res.data.status == "success") {
                    dispatch({ type: ActionTypes.ORDERLIST, data: res.data.data.orderList });
                    return res.data
                }
                else {
                    showToast(res.data.message, "danger")
                    return res.data
                }
            } else {
                showToast(res.data.message, "danger")
                return res
            }
        }).catch(function (error) {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            console.log(url.orderlist, error.message)
            //showToast(error.message, "danger")
        });
}

export const orderdetails = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    return axios.get(url.orderdetails + '?id=' + payloads.id + '&deliveryBoyId=' + payloads.deliveryBoyId)
        .then(res => {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            if (res.status == 200) {
                if (res.data.status == "success") {

                    dispatch({ type: ActionTypes.ORDERDETAILS, data: res.data.data.orderDetails });
                    dispatch({ type: ActionTypes.ORDERITEMS, data: res.data.data.orderItems });
                    return res.data
                }
                else {
                    showToast(res.data.message, "danger")
                    return res.data
                }
            } else {
                showToast(res.data.message, "danger")
                return res
            }
        }).catch(function (error) {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            console.log(url.orderdetails, error.message)
            //showToast(error.message, "danger")
        });
}
export const updatestatus = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    return axios.post(url.orderstatus, { payloads: payloads })
        .then(res => {
            console.log("STATUS", res)
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            if (res.status == 200) {
                if (res.data.status == "success") {
                    dispatch({ type: ActionTypes.ORDERSTATUS, data: res.data.data });
                    return res.data
                }
                else {
                    showToast(res.data.message, "danger")
                    return res.data
                }
            } else {
                showToast(res.data.message, "danger")
                return res
            }
        }).catch(function (error) {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
            console.log(url.orderstatus, error.message)
            //showToast(error.message, "danger")
        });
}





