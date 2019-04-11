import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = (id, error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/order.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START,

    };
};

export const fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
};

export const fetchOrders = () => {
    return dispatch => {
        axios.get('/order.json').then(
            res => {
                console.log("rest",res.data);
                const fetchedOrders = [];
                for( let key in res.data){
                    fetchedOrders.push({id : key, ...res.data[key]});
                }
                console.log(fetchedOrders);
               dispatch(fetchOrdersSuccess(fetchedOrders));
            }
        ).catch(err => {
            dispatch(fetchOrdersFail(err));
        });
    }
}