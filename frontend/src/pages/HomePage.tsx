import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigate from "@/components/Navigate";
import Products from "@/components/Products";

const HomePage = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-border-subtle dark:border-gray-800">
        <Navigate />
      </header>
      <main className="">
        <Hero />
        <Category />
        <Products />
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-border-subtle dark:border-gray-800 pt-16 pb-8">
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
