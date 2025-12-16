import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholderImage from "../assets/placeholderSignUp.png";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { signupUser } from "@/features/auth/authSlice";


const signUpSchema = z.object({
  firstname: z.string().min(1, "first name cannot blank"),
  lastname: z.string().min(1, "last name cannot blank"),
  username: z.string().min(3, "username must longer than 3 character"),
  email: z.string().email("email not valid"),
  password: z.string().min(6, "password must 6 character long or longer"),
});

type SigUpFormValue = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    reset, // clear form
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigUpFormValue>({
    resolver: zodResolver(signUpSchema),
  });

  const dispatch = useAppDispatch()
  const {error, message} = useAppSelector((state) => state.auth)

  const onSubmit = async (data: SigUpFormValue) => {
    try {
      await dispatch(signupUser(data)).unwrap()
      reset()
    } catch (error) {
      console.log('error while sign up user', error)
    }
  };

  return (
    <>
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/*header */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center"></a>
                <h1 className="text-2xl font-bold">Create fuexam account</h1>
                <p className="text-muted-foreground text-balance">
                  Welcome, please register
                </p>
              </div>
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
              {message && (
                <p className="text-destructive text-sm">{message}</p>
              )}
              

              {/*Ho va ten*/}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Last Name
                  </Label>
                  <Input type="text" id="lastname" {...register("lastname")} />
                  {errors.lastname && (
                    <p className="text-destructive text-sm">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    First Name
                  </Label>
                  <Input type="text" id="firstame" {...register("firstname")} />
                  {errors.firstname && (
                    <p className="text-destructive text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>
              {/*Username*/}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">
                  Username
                </Label>
                <Input type="text" id="username" {...register("username")} />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}

                <Button className="w-full mt-5">Submit</Button>

                <div className="text-center text-sm *:[a]:!underline underline-offset-4 *:[a]:hover:!text-muted-foreground">
                  Already have account ? <a href="/signin">Sign in now</a>
                </div>
              </div>
            </div>
          </form>

          {/*Side img */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={placeholderImage}
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div
        className="px-6 text-center text-xs text-balance text-muted-foreground 
  [&_a]:!underline [&_a]:underline-offset-4 [&_a]:hover:!text-primary"
      >
        {/* Các thẻ a bên trong giữ nguyên, không cần thêm class */}
        By clicking continue, you agree to our <a href="#">
          Terms of Service
        </a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </>
  );
}
