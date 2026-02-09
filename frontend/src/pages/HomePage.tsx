import Category from "@/components/home/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Navigate from "@/components/Navigate";
import Products from "@/components/product/Products";

const HomePage = () => {
  return (
    <>
      <Navigate />
      <main className="">
        <Hero />
        <Category />
        <Products />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
