import axios from "axios";
import { api } from "./api";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${api}/users/profile`, {
      withCredentials: true,
    });

    const result = await response.data;

    console.log(result);

    if (result.success) {
      return { user: result.user, state: true };
    } else {
      return { state: false };
    }
  } catch (error) {
    return { state: false };
  }
};
