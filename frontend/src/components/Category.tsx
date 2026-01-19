const Category = () => {
  return (
    <section className="py-8 bg-background-light dark:bg-background-dark border-b border-border-subtle dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
          <button className="cursor-pointer shrink-0 px-6 py-2.5 bg-text-main text-white rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95">
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
