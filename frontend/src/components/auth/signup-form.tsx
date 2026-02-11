import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

const SignUpFormSchema = z.object({
  fullName: z.string().min(4, "Vui lòng nhập tên đầy đủ"),
  username: z.string().min(4, "Tên đăng nhập ít nhất 4 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { fullName, username, password } = data;
      await signUp(fullName, username, password);
      toast.success(
        "Đăng ký thành công. Bạn sẽ được chuyển sang trang đăng nhập.",
      );
      reset();

      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại. Người dùng đã tồn tại. Hãy thử lại!");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-2 self-center font-bold text-2xl">
            <div className="mb-2 bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full">
              <ShoppingBag className="size-6" />
            </div>
            Kshop
          </div>

          <Card className="grid grid-cols-2 py-2 px-2 bg-neutral-100/60 mt-4 shadow-none border-none gap-2">
            <Button className="bg-white rounded-xl shadow py-5 text-black text-md font-semibold hover:bg-white transition-all duration-300">
              Register
            </Button>

            <Button className="bg-transparent rounded-xl py-5 text-neutral-400 text-md font-semibold hover:bg-white hover:text-black hover:shadow transition-all duration-300 cursor-pointer">
              <a href="/signin">Login</a>
            </Button>
          </Card>

          <CardTitle className="text-xl font-bold mt-3">
            Create Account
          </CardTitle>
          <CardDescription className="text-secondary">
            Join our community of young trendsetters today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-col gap-4">
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Tieu Truong Khanh"
                  required
                  className="rounded-lg"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.fullName?.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="khanhtieu"
                  required
                  className="rounded-lg"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.username?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field className="">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="rounded-lg"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm font-semibold">
                        {errors.password?.message}
                      </p>
                    )}
                  </Field>
                </Field>
                <FieldDescription className="text-secondary">
                  Must be at least 6 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="rounded-xl cursor-pointer py-5"
                  disabled={isSubmitting}
                >
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/signin" className="hover:text-primary">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-balance">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
