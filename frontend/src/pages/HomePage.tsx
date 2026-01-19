import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Navigate from "@/components/Navigate";
import Products from "@/components/Products";

const HomePage = () => {
  return (
    <>
      <Navigate />
      <Hero />
      <Category />
      <Products />
    </>
  );
};

export default HomePage;
