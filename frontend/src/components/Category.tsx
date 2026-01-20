const Category = () => {
  return (
    <section className="py-8 bg-background-light dark:bg-background-dark border-b border-border-subtle dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 grid-rows-1 gap-3 overflow-x-auto hide-scrollbar pb-2">
          {/* Clothing */}
          <a
            className="group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
            href="#"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img2.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Clothing
              </h3>
            </div>
          </a>

          {/* Shoes */}
          <a
            className="group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
            href="#"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img3.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Shoes
              </h3>
            </div>
          </a>

          {/* Accessories */}
          <a
            className="group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
            href="#"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img4.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Accessories
              </h3>
            </div>
          </a>
          {/* <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-text-main text-white rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95">
            All
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            New Arrivals
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            Best Sellers
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            Outerwear
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            Essentials
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            Accessories
          </button>
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-surface-light dark:bg-gray-800 text-text-main dark:text-gray-300 border border-border-subtle dark:border-gray-700 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all hover:shadow-sm active:scale-95">
            Sale
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Category;
