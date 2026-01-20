import api from "@/lib/axios";

export const authService = {
  signUp: async (fullName: string, username: string, password: string) => {
    try {
      const res = await api.post(
        "auth/signup",
        {
          fullName,
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  signIn: async (username: string, password: string) => {
    try {
      const res = await api.post(
        "auth/signin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );

      return res.data; //access token
    } catch (error) {
      console.error(error);
    }
  },

  signOut: async () => {
    try {
      await api.post("auth/signout", {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  },

  fetchMe: async () => {
    const res = await api.get("users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("auth/refresh", {}, { withCredentials: true });

    return res.data; // access token
  },
};
