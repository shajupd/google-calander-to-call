import appApi from "@/lib/axios.instance";
import { User } from "@/models/user.model";

export const getUserByEmail = async (email: string) => {
  try {
    const res = await appApi.get("/users", {
      params: {
        email,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log("🚀 ~ getUserByEmail ~ error:", error);
  }
};

export const updateUserBuEmail = async (email: string, data: Partial<User>) => {
  try {
    const res = await appApi.put(`/users/${email}`, data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log("🚀 ~ updateUserBuEmail ~ error:", error);
  }
};
