import api from "@/lib/axios";

export const userService = {
  updateInformation: async (
    username: string,
    fullName: string,
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      const res = await api.put("users/update", {
        username,
        fullName,
        currentPassword,
        newPassword,
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
