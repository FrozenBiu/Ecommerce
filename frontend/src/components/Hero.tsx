import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-surface-light dark:bg-surface-dark/50">
      <div className="max-w-375 mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* <!-- Text Content --> */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8 order-2 md:order-1 text-center md:text-left">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                New Season
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main dark:text-white leading-[1.1] tracking-tight">
                Style That Speaks <br className="hidden lg:block" /> Your
                Language
              </h2>
              <p className="mt-4 text-lg text-text-sub dark:text-gray-300 font-medium max-w-lg mx-auto md:mx-0">
                Curated collections for the modern minimalist. Discover pieces
                that blend seamlessly into your life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/products")}
                className="cursor-pointer px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Shop Collection
                <span className="material-symbols-outlined text-sm">
                  <ArrowRight size={20} />
                </span>
              </button>
              <button className="cursor-pointer px-8 py-4 bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 hover:border-primary text-text-main dark:text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                View Lookbook
              </button>
            </div>
          </div>
          {/* <!-- Image Content --> */}
          <div className="md:col-span-7 order-1 md:order-2 relative group">
            {/* <!-- Abstract Background Blobs --> */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none"></div>
            <div className="relative w-full aspect-4/3 md:aspect-auto md:h-125 overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 bg-[url(/Hero.png)]"
                data-alt="Woman in beige coat walking in a modern minimalist setting"
              ></div>
              {/* <!-- Floating Card Overlay --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
