import {
  LayoutGrid,
  LogOutIcon,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "About", path: "/about" },
];

const Navigate = () => {
  const { user, signOut } = useAuthStore();

  const navigate = useNavigate();

  const redirectToPage = (page: string) => {
    navigate(`/${page}`);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
      <div className="flex items-center justify-between gap-4 md:gap-8 h-12">
        {/* <!-- Logo --> */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="size-10 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-[24px]">
              <LayoutGrid />
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">
            Store.
          </h1>
        </a>
        {/* <!-- Search Bar (Hidden on Mobile) --> */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full group">
            <span className="absolute inset-y-0 left-3 flex items-center text-text-sub dark:text-gray-400 group-focus-within:text-primary transition-colors">
              <span className="text-[20px]">
                <Search className="size-5" />
              </span>
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 bg-surface-light dark:bg-surface-dark border border-border-subtle dark:border-gray-700 rounded-full text-sm placeholder-text-sub focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              placeholder="Search essentials..."
              type="text"
            />
          </div>
        </div>
        {/* <!-- Navigation Links & Icons --> */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-text-sub dark:text-gray-400">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors cursor-pointer hover:bg-transparent ${
                    isActive
                      ? "text-primary font-bold underline decoration-2 underline-offset-4"
                      : "text-text-sub"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div
              className={`p-2 text-text-main dark:text-white hover:text-primary ${user ? "hover:bg-surface-light" : ""} dark:hover:bg-white/5 rounded-full transition-colors `}
            >
              <span className="block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-0 flex items-center">
                      {/* User Icon */}
                      <UserRound />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* <DropdownMenuLabel className="text-md font-semibold">
                        My Account
                      </DropdownMenuLabel> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem className="text-md font-medium">
                        <UserRound className="size-5" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-md font-medium"
                        variant="destructive"
                      >
                        <LogOutIcon />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => redirectToPage("login")}
                    className="hover:bg-primary/90 hover:text-white border-primary font-semibold text-md cursor-pointer"
                  >
                    Login
                  </Button>
                )}
              </span>
            </div>

            {user && (
              <button
                className={`relative p-2 text-text-main dark:text-white hover:text-primary ${user ? "hover:bg-surface-light" : ""} dark:hover:bg-white/5 rounded-full transition-colors group`}
              >
                <span className="block text-[24px]">
                  <ShoppingCart className="size-6" />
                </span>
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </button>
            )}
            <button className="md:hidden p-2 text-text-main dark:text-white hover:text-primary rounded-full transition-colors">
              <span className="block text-[24px]">
                <Menu />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
