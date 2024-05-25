import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { AButton } from "@/components/atoms/button/index";
import { ALabel } from "@/components/atoms/label/index";
import {
  ACardContent,
  ACardDescription,
  ACardFooter,
  ACardHeader,
  ACardTitle,
} from "@/components/atoms/card/index";
import { AFormInput } from "@/components/atoms/input/index";
import { ILoginPayload } from "@/services/auth/login.post";
import { useLoginPost } from "@/hooks/auth/mutations/use-login-post.mutation";
import { useToast } from "@/components/atoms/toast/use-toast";

interface ILoginFormProps {
  className: string;
}

const validationSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "You must enter a username" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "You must enter a password" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const LoginForm = ({ className }: ILoginFormProps) => {
  const { handleSubmit, control } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isLoading } = useLoginPost({
    onSuccess: (response) => {
      localStorage.setItem("authToken", response.data.accessToken);

      navigate(
        {
          pathname: "admin/dashboard",
        },
        {
          replace: true,
        }
      );

      toast.toast({
        title: "Welcome!",
      });
    },
  });

  const onSubmit = (payload: ILoginPayload) => {
    mutate(payload);
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <ACardHeader>
        <ACardTitle>Login</ACardTitle>
        <ACardDescription>
          Please enter your username and password to access your account.
        </ACardDescription>
      </ACardHeader>
      <ACardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <ALabel htmlFor="username">Username</ALabel>
            <AFormInput
              id="username"
              name="username"
              placeholder="username"
              control={control}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <ALabel htmlFor="password">Password</ALabel>
            <AFormInput
              id="password"
              name="password"
              type="password"
              placeholder="*****"
              control={control}
              autoComplete="off"
            />
          </div>
        </div>
      </ACardContent>
      <ACardFooter className="flex justify-between">
        <AButton type="reset" variant="outline">
          Cancel
        </AButton>
        <AButton disabled={isLoading} loading={isLoading}>
          Sign In
        </AButton>
      </ACardFooter>
    </form>
  );
};
