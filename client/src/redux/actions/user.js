import { server } from "../../server";
import axios from "axios";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// update user information
// export const updateUserInfo = (email, password, phoneNumber, name) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "updateUserInfoRequest",
//     });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true
//     };

//     const { data } = await axios.put(
//       `${server}/user/update-user-info`,
//       {
//         email,
//         password,
//         phoneNumber,
//         name,
//       },
//       config
//     );

//     dispatch({
//       type: "updateUserInfoSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "updateUserInfoFail",
//       payload: error.response?.data?.message || "Có lỗi xảy ra",
//     });
//   }
// };
export const updateUserInfo = (email, password, phoneNumber, name) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${server}/user/update-user-info`,
      {
        email,
        password,
        phoneNumber,
        name,
      },
      config
    );

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });

    // Thêm message vào payload
    dispatch({
      type: "updateUserMessage",
      payload: data.message,
    });

  } catch (error) {
    dispatch({
      type: "updateUserInfoFail",
      payload: error.response?.data?.message || "Có lỗi xảy ra",
    });
  }
};

export const updateUserAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const response = await axios.put(
      `${server}/user/update-user-addresses`,
      addressData,
      config  
    );

    // Kiểm tra response trước khi dispatch
    if (response && response.data) {
      dispatch({
        type: "updateUserAddressSuccess", 
        payload: {
          user: response.data.user,
          successMessage: "Địa chỉ đã được thêm thành công"
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "updateUserAddressFail",
      payload: error.response?.data?.message || "Có lỗi xảy ra"
    });
  }
};

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      config
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: data.message,
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error.response?.data?.message || "Có lỗi xảy ra",
    });
  }
};

export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersAdminRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-get-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersAdminSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersAdminFail",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/user/logout`, { withCredentials: true });
    dispatch({ type: "userLogoutSuccess" });
    dispatch(loadUser()); // This will reset the user state
  } catch (error) {
    dispatch({
      type: "userLogoutFail",
      payload: error.response.data.message,
    });
  }
};

export const setSelectedAddress = (address) => ({
  type: "setSelectedAddress",
  payload: address,
});
