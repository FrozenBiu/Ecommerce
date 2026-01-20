import { create } from "zustand";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken) => set({ accessToken }),
  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (fullName, username, password) => {
    try {
      set({ loading: true });

      // gọi backend
      await authService.signUp(fullName, username, password);

      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập",
      );
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký không thành công!");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      // gọi backend
      const { accessToken } = await authService.signIn(username, password);

      get().setAccessToken(accessToken);

      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });

      // gọi backend
      await authService.signOut();

      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng xuất không thành công! Hãy thử lại");
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();

      const { accessToken } = await authService.refresh();

      setAccessToken(accessToken);

      // nếu chưa có người dùng thì gọi fetchMe để lấy dữ liệu người dùng
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.error(error);
      toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      get().clearState(); // xoá toàn bộ thông tin đăng nhập hiện tại
    } finally {
      set({ loading: false });
    }
  },
}));
