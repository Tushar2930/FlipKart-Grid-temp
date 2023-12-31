import * as actionType from "../action-type/wishlistActionType";
import axios from "../adapters/axios";

export const addToWishlist = (item) => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      await axios.post("https://flipkart-web.vercel.app/api/wishlist/add-item", {
        userId: user._id,
        productId: item._id,
      });
    } catch (error) {}
  }
  dispatch({
    type: actionType.ADD_TO_WISHLIST,
    payload: {
      item,
    },
  });
};

export const removeFromWishlist = (id) => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      await axios.delete("https://flipkart-web.vercel.app/api/wishlist/remove-item", {
        data: {
          userId: user._id,
          productId: id,
        },
      });
    } catch (error) {}
  }
  dispatch({
    type: actionType.REMOVE_FROM_WISHLIST,
    payload: {
      id: id,
    },
  });
};

export const getWishlistItems = () => async (dispatch, getState) => {
  const { isAuthenticate, user } = getState().userReducer;
  if (isAuthenticate) {
    try {
      const { data } = await axios.get(`https://flipkart-web.vercel.app/api/wishlist/get-items/${user._id}`);
      const wishlistItems = [];

      data?.map((value) => {
        wishlistItems.push(value.productDetails[0]);
      });
      dispatch({
        type: actionType.SET_WISHLIST_ITEMS,
        payload: {
          wishlistItems: wishlistItems,
        },
      });
    } catch (error) {}
  }
};
