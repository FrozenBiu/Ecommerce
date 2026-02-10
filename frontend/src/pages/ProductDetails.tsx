import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { useAuthStore } from "@/stores/useAuthStore";
import useCartStore from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Maximize2,
  Minus,
  Plus,
  ShoppingBasket,
  Star,
  Van,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "yet-another-react-lightbox/styles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { addProductToCart } = useCartStore();
  const { loading, product, productList, getProductDetails, getProductList } =
    useProductStore();
  const [amount, setAmount] = useState(1);

  const [currentImage, setCurrentImage] = useState<string | undefined>(
    product?.image,
  );
  const thumbnailsImg = (product?.images as string[]) || [];

  const fetchProduct = async () => {
    try {
      getProductList({
        keyword: "",
        pageNumber: Math.ceil(Math.random() * productList.totalPages),
        minPrice: 1,
        maxPrice: 99999,
        category: "",
        sort: "",
      });
      getProductDetails(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProductToCart = async () => {
    if (user?._id && id) {
      await addProductToCart(user._id, id, amount);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!currentImage && product?.images?.length) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  // useEffect(() => {
  //   if (product && product.images && product.images.length > 0) {
  //     setCurrentImage(product.images[0]);
  //   } else if (product?.image) {
  //     setCurrentImage(product.image);
  //   }
  // }, [product]);

  function openFullscreen() {
    const img = document.querySelector(".main-img");
    if (img && img.requestFullscreen) {
      img.requestFullscreen();
    }
  }

  function handleNextImg() {
    if (!currentImage) return;
    const index = thumbnailsImg.indexOf(currentImage);
    if (index < thumbnailsImg.length - 1) {
      setCurrentImage(thumbnailsImg[index + 1]);
    } else {
      setCurrentImage(thumbnailsImg[0]);
    }
  }

  function handlePrevImg() {
    if (!currentImage) return;
    const index = thumbnailsImg.indexOf(currentImage);
    if (index > 0) {
      setCurrentImage(thumbnailsImg[index - 1]);
    } else {
      setCurrentImage(thumbnailsImg[thumbnailsImg.length - 1]);
    }
  }

  return (
    <div>
      <Navigate />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="max-w-420 min-h-[75vh] mx-auto mt-5 px-4 md:px-8 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
            {/* <!-- Left: Product Gallery --> */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* <!-- Main Image --> */}
              <div className="w-full aspect-4/3 md:aspect-16/10 lg:aspect-square xl:aspect-16/12 bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden relative group">
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 `}
                >
                  <img
                    src={currentImage}
                    alt=""
                    className="main-img object-cover size-full"
                  />
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="bg-white/90 dark:bg-black/50 backdrop-blur text-slate-900 dark:text-white p-3 rounded-full hover:scale-105 transition-transform shadow-sm">
                    <span className=" text-[20px]">
                      <Maximize2 onClick={() => openFullscreen()} />
                    </span>
                  </button>
                </div>

                {/* Button next */}
                <div className="absolute right-2 top-1/2">
                  <button className="size-11 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/80">
                    <ArrowRight className="size-7" onClick={handleNextImg} />
                  </button>
                </div>

                {/* Button previous */}
                <div className="absolute left-2 top-1/2">
                  <button className="size-11 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/80">
                    <ArrowLeft className="size-7" onClick={handlePrevImg} />
                  </button>
                </div>
              </div>

              {/* <!-- Thumbnails Grid --> */}
              <div className="grid grid-cols-4 gap-4">
                {product?.images.map((img) => (
                  <div
                    key={img}
                    className={`aspect-square rounded-xl bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer ${img === currentImage ? "ring-2 ring-primary ring-offset-2 ring-offset-white" : ""} dark:ring-offset-background-dark`}
                  >
                    <div className="w-full h-full bg-cover bg-center ">
                      <img
                        src={img}
                        alt=""
                        className="thumbnails-img object-cover size-full"
                        onClick={() => setCurrentImage(img)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <!-- Right: Product Info & Actions --> */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28 flex flex-col gap-8">
                {/* <!-- Header Info --> */}
                <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      New Season
                    </span>
                    <span className="text-green-600 bg-green-50 dark:bg-green-900/20 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                      In Stock
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                    Meridian Utility Jacket
                  </h1>
                  <div className="flex items-end gap-4">
                    <span className="text-3xl font-medium text-slate-900 dark:text-white">
                      $148.00
                    </span>
                  </div>
                </div>

                {/* <!-- Accordions --> */}
                <div className="pt-4 space-y-2">
                  <details
                    open
                    className="group border-b border-slate-100 dark:border-slate-800 pb-4"
                  >
                    <summary className="flex justify-between items-center text-[20px] font-semibold cursor-pointer text-slate-900 dark:text-white py-2">
                      Description
                      <span className=" transition-transform group-open:rotate-180 text-slate-400">
                        <ChevronDown />
                      </span>
                    </summary>
                    <div className="text-slate-600 dark:text-slate-400 text-[18px] leading-relaxed mt-2">
                      <p>{product?.description}</p>
                    </div>
                  </details>
                </div>

                {/* <!-- CTA Actions --> */}
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl h-14 w-32 px-3">
                    <button
                      onClick={() => {
                        if (amount > 2) {
                          const newQty = Number(amount - 1);
                          setAmount(newQty);
                        } else {
                          setAmount(1);
                        }
                      }}
                      className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                    >
                      <span className=" text-[18px] cursor-pointer">
                        <Minus />
                      </span>
                    </button>
                    <input
                      className="w-full text-center bg-transparent border-none focus:ring-0 font-semibold text-slate-900 dark:text-white p-0"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <button
                      onClick={() => {
                        const newQty = Number(amount + 1);
                        setAmount(newQty);
                      }}
                      className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                    >
                      <span className=" text-[18px] cursor-pointer">
                        <Plus />
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={handleAddProductToCart}
                    className="cursor-pointer flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold h-14 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Add to Cart</span>
                    <span className=" text-[20px] ">
                      <ShoppingBasket />
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-surface-light dark:bg-surface-dark p-3 rounded-lg">
                  <span className=" text-primary">
                    <Van />
                  </span>
                  <span className="text-[16px]">
                    Free standard shipping on orders over $100
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Below Fold Section --> */}
          <div className="mt-24 border-t border-slate-100 dark:border-slate-800 pt-16">
            {/* <!-- Reviews Header --> */}
            <div
              className="flex flex-col md:flex-row gap-12 items-start"
              id="reviews"
            >
              <div className="w-full md:w-1/3 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-4">
                  <div className="text-6xl font-bold text-slate-900 dark:text-white tracking-tighter">
                    4.8
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 text-lg">
                      <span className=" fill-current">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current">
                        <Star className="" />
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      Based on 124 reviews
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-slate-500">5 ★</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[80%] rounded-full"></div>
                    </div>
                    <span className="w-8 text-right text-slate-500">80%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-slate-500">4 ★</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[15%] rounded-full"></div>
                    </div>
                    <span className="w-8 text-right text-slate-500">15%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-slate-500">3 ★</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 dark:bg-slate-700 w-[3%] rounded-full"></div>
                    </div>
                    <span className="w-8 text-right text-slate-500">3%</span>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold hover:border-primary hover:text-primary transition-colors">
                  Write a Review
                </button>
              </div>
              {/* <!-- Reviews List --> */}
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <!-- Review Card 1 --> */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-primary flex items-center justify-center font-bold">
                        JD
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          John Doe
                        </h4>
                        <span className="text-xs text-slate-500">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm">
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Absolutely love this jacket. The fit is perfect for layering
                    and the material feels very premium. Highly recommend
                    grabbing one in sandstone!
                  </p>
                </div>
                {/* <!-- Review Card 2 --> */}
                <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold overflow-hidden">
                        <img
                          alt="Sarah avatar"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwfhEu8Jto-Btq-cvWtxF20Nw8_medLtQbxtEmVelib2-D0SP2XWkNjehYzupCxvBMF39y14816zbxGmhyKCy-dX9ZaI0aE1g9egy3xkyJAkUGVynvmAsPKxJIUTGH1z7b4SEM1Y6456ga7x6SV57AOyjW1ElbvxtVOcHX-N5Q2jgaJAQ_QCK0Tv9rUOwMegGRsZ4XtTZ7ial_9-iFxCVRAZyJmGcwukkd79pcilO1wsoF-nPd-XMffGkwjePHN2XRjCE-5Qr66Puc"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          Sarah M.
                        </h4>
                        <span className="text-xs text-slate-500">
                          1 week ago
                        </span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm">
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" fill-current text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                      <span className=" text-[16px]">
                        <Star className="fill-amber-400/80" />
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Great quality, but the sleeves run a little long for my
                    taste. Rolling them up fixes it though and gives it a nice
                    casual look.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                      <img
                        alt="User review photo of jacket sleeve"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0MYYJNT6uWqodE5B7WKr9-hX8zXUOE2ITBUNxPmA-U_e7Q4NjhTsA1YtcI7zlEvR_BHlWN-nvyGz8N5pVoc99vjF-VVTurrl0HHVFl-R1xmhCVUUk5As6zVYMmjtNNM627wJcic1LjAY8S_svpcl8dOmFmMv1r6Erwp4exL9nOSKLk8TMAJ4i9Uelf_hndyxC8_WUaXyRPiZAxTPUw5kX2Qkz2nxf5YH3A9IJPn9P0qR-QPymEqTjU7IdNxVV0Ij0JCcNC9MnTbcS"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Related Products --> */}
          <div className="mt-24 pb-12">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                You Might Also Like
              </h2>
              <a
                className="text-primary font-semibold text-sm hover:underline"
                href="/products"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {productList.products.slice(0, 4).map((product) => {
                return (
                  <div key={product._id} className="group cursor-pointer">
                    <div className="aspect-3/4 rounded-xl bg-surface-light dark:bg-surface-dark overflow-hidden mb-3 relative">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={product.image}
                          alt=""
                          className="object-cover size-full"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-primary text-md font-bold">
                      ${product.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
