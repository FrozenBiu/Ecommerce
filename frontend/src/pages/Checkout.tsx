import Loading from "@/components/Loading";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import useCartStore from "@/stores/useCartStore";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

const ShippingInformation = z.object({
  fullname: z.string().min(6, "Name must have at least 6 characters."),
  address: z.string().min(3, "Please fill your address."),
  phone: z.string().min(10, "Phone must have 10 characters."),
});

type ShippingInformationValue = z.infer<typeof ShippingInformation>;

const Checkout = () => {
  const { user, loading } = useAuthStore();
  const { cart, getCurrentCart } = useCartStore();
  const [cartLoading, setCartLoading] = useState(true);
  const [vietqrUrl, setVietqrUrl] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ShippingInformationValue>({
    defaultValues: {
      fullname: "",
      address: "",
      phone: "",
    },
    resolver: zodResolver(ShippingInformation),
  });

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        "https://api.vietqr.io/v2/generate",
        {
          accountNo: 109868824036,
          accountName: "Tieu Truong Khanh",
          acqId: 970415,
          amount: orderTotal * 1000,
          addInfo: "Chuyen khoan thanh toan hoa don mua sam",
          format: "text",
          template: "compact2",
        },
        {
          headers: {
            "x-client-id": "883f1dc6-e430-408a-8db1-35dbae2fcc5d",
            "x-api-key": "0d309383-4da0-41fa-b881-0072c631735c",
          },
        },
      );

      setVietqrUrl(res.data.data.qrDataURL);
      reset();
    } catch (error) {
      console.error("Lỗi khi gọi API VietQR", error);
      toast.error("Lỗi trong khi tạo mã QR thanh toán");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getCurrentCart(user._id);
      setCartLoading(false);
    }
  }, [user, getCurrentCart]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (imageRef.current?.contains(target)) {
        setVietqrUrl("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [vietqrUrl]);

  const tax = Math.ceil((cart?.totalPrice ?? 0) * 0.05);
  const orderTotal = (cart?.totalPrice ?? 0) + tax;

  if (loading || cartLoading) return <Loading />;
  if (!user)
    return (
      <div className="w-screen h-screen flex items-center justify-center font-semibold text-3xl">
        Vui lòng đăng nhập
      </div>
    );
  return (
    <>
      <Navigate />
      <main>
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col sm:flex-row justify-between sm:gap-10">
          {/* main content */}
          <div className="flex-1">
            <p className="text-2xl font-bold mb-5">Shipping Information</p>

            <form
              id="shippingInformationForm"
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-3">
                <Label htmlFor="fullname" className="text-md text-neutral-700">
                  Fullname
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="Nguyen Van A"
                  {...register("fullname")}
                />
                {errors.fullname && (
                  <p className="text-destructive text-sm ">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="address" className="text-md text-neutral-700">
                  Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  placeholder="123 Hoang Hoa Tham"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-destructive text-sm ">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="phone" className="text-md text-neutral-700">
                  Phone number
                </Label>
                <Input
                  type="text"
                  id="phone"
                  placeholder="0123456789"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm ">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Order summary */}
              <div className="mt-10 sm:mt-0 h-fit min-w-95 shadow-2xl rounded-lg p-8">
                <p className="text-xl font-bold">Order Summary</p>

                <div className="my-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-secondary font-medium">Subtotal</p>
                    <p className="font-semibold">${cart?.totalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-secondary font-medium">
                      Shipping estimate
                    </p>
                    <p className="font-semibold">Free</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-secondary font-medium">Tax</p>
                    <p className="font-semibold">${tax}</p>
                  </div>
                </div>

                <div className="my-5 border divide-dashed rounded-full"></div>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">Order Total</p>
                  <p className="font-extrabold text-3xl">${orderTotal}</p>
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-5 rounded-2xl w-full cursor-pointer group py-5"
                >
                  Place Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {vietqrUrl !== "" && (
        <div className="fixed mt-18 inset-0 bg-black/20">
          <div
            ref={imageRef}
            className="fixed top-30 left-0 translate-x-[50%] w-full h-full"
          >
            <img src={vietqrUrl} className="-translate-x-1/2 object-cover" />
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
