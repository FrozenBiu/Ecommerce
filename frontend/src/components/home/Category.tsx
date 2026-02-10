import { useNavigate } from "react-router";

const Category = () => {
  const navigate = useNavigate();

  const handleChange = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <section className="py-8 bg-background-light dark:bg-background-dark border-b border-border-subtle dark:border-gray-800">
      <div className="max-w-375 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-3 overflow-x-auto hide-scrollbar pb-2">
          {/* Clothing */}
          <button
            onClick={() => handleChange("Clothing")}
            className="cursor-pointer group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img2.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Clothing
              </h3>
            </div>
          </button>

          {/* Shoes */}
          <button
            className="cursor-pointer group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
            onClick={() => handleChange("Shoes")}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img3.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Shoes
              </h3>
            </div>
          </button>

          {/* Accessories */}
          <button
            className="cursor-pointer group relative block w-full aspect-4/3 md:aspect-3/4 lg:aspect-4/3 overflow-hidden rounded-2xl shadow-sm hover:shadow-hover transition-all duration-300"
            onClick={() => handleChange("Accessories")}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url(/ProductCard/img4.png)]"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Accessories
              </h3>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
