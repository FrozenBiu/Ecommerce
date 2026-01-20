import { LayoutGrid, Search, ShoppingCart, User } from "lucide-react";

const Navigate = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
      <div className="flex items-center justify-between gap-4 md:gap-8 h-12">
        {/* <!-- Logo --> */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="size-10 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">
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
              <span className="material-symbols-outlined text-[20px]">
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
            <a
              className="hover:text-primary transition-colors text-text-sub"
              href="#"
            >
              Home
            </a>
            <a
              className="hover:text-primary transition-colors text-text-sub"
              href="#"
            >
              Shop
            </a>
            <a
              className="hover:text-primary transition-colors text-text-sub"
              href="#"
            >
              About
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="p-2 text-text-main dark:text-white hover:text-primary hover:bg-surface-light dark:hover:bg-white/5 rounded-full transition-colors">
              <span className="material-symbols-outlined block text-[24px]">
                <User />
              </span>
            </button>
            <button className="relative p-2 text-text-main dark:text-white hover:text-primary hover:bg-surface-light dark:hover:bg-white/5 rounded-full transition-colors group">
              <span className="material-symbols-outlined block text-[24px]">
                <ShoppingCart />
              </span>
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </button>
            <button className="md:hidden p-2 text-text-main dark:text-white hover:text-primary rounded-full transition-colors">
              <span className="material-symbols-outlined block text-[24px]">
                menu
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
