import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/stores/useAuthStore";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Schema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must have at least 6 characters."),
    newPassword: z.string().min(6, "Password must have at least 6 characters."),
    confirmNewPassword: z
      .string()
      .min(6, "Password must have at least 6 characters."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password not match",
    path: ["confirmNewPassword"],
  });

type SchemaValue = z.infer<typeof Schema>;

const Information = () => {
  const { user } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaValue>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: SchemaValue) => {
    try {
      const { currentPassword, newPassword } = data;
      console.log(`===> Username: ${user?.username}`);
      const res = await userService.updateInformation(
        user?.username,
        fullName,
        currentPassword,
        newPassword,
      );

      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("Error when update information.");
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <>
      <Navigate />
      <main className="w-full flex justify-center">
        <section className="max-w-3xl w-full py-6 md:py-10">
          {/* Fullname */}
          <div className="text-3xl font-black text-center">
            {user?.fullName}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal details */}
            <Card className="p-8 mt-7">
              <p className="flex gap-3 font-bold text-lg">
                <User />
                Personal Details
              </p>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-black text-black/75">
                  Full Name
                </Label>
                <Input
                  className="text-md bg-[#ccc2]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <p className="flex gap-3 font-bold text-lg">
                <Lock />
                Security
              </p>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-black text-black/75">
                  Current Password
                </Label>
                <Input
                  type="password"
                  className="text-md bg-[#ccc2]"
                  placeholder="**********"
                  {...register("currentPassword")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 md:gap-y-0">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-black text-black/75">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    className="text-md bg-[#ccc2]"
                    placeholder="Min. 6 characters"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-destructive text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-black text-black/75">
                    Confirm New Password
                  </Label>
                  <Input
                    type="password"
                    className="text-md bg-[#ccc2]"
                    placeholder="Repeat new password"
                    {...register("confirmNewPassword")}
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-destructive text-sm">
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Button save changes */}
            <div className="mt-6 flex gap-3 justify-end items-center">
              <Button
                variant={"outline"}
                className="cursor-pointer hover:bg-destructive/80 hover:text-white"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Information;
