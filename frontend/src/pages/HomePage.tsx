import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigate from "@/components/Navigate";
import Products from "@/components/Products";

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
