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
import { LockKeyhole, ShoppingBag, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const SignInFormSchema = z.object({
  username: z.string().min(4, "Tên đăng nhập ít nhất 4 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data;
    try {
      await signIn(username, password);
      reset(); // reset form
      navigate("/"); // chuyển sang trang home
    } catch (error) {
      console.error(error);
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
              Login
            </Button>

            <Button className="bg-transparent rounded-xl py-5 text-neutral-400 text-md font-semibold hover:bg-white hover:text-black hover:shadow transition-all duration-300 cursor-pointer">
              <a href="/signup">Register</a>
            </Button>
          </Card>

          <CardTitle className="text-xl font-bold">Welcome back!</CardTitle>
          <CardDescription className="text-secondary">
            Enter your details to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">
                  Username
                  <User className="size-4" />
                </FieldLabel>
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
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">
                      Password
                      <LockKeyhole className="size-4" />
                    </FieldLabel>
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
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="rounded-xl py-5 cursor-pointer"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/signup" className="hover:text-primary">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
