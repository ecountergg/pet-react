import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { AButton } from "@/components/atoms/button/index";
import {
  ACardContent,
  ACardDescription,
  ACardFooter,
  ACardHeader,
  ACardTitle,
} from "@/components/atoms/card/index";
import { AInput } from "@/components/atoms/input/index";
import { ILoginPayload } from "@/services/auth/login.post";
import { useLoginPost } from "@/hooks/auth/mutations/use-login-post";
import { useToast } from "@/components/atoms/toast/use-toast";
import {
  AForm,
  AFormControl,
  AFormField,
  AFormItem,
  AFormLabel,
  AFormMessage,
} from "@/components/atoms/form";

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

export const MLoginForm = ({ className }: ILoginFormProps) => {
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isPending } = useLoginPost({
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
    <AForm {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        <ACardHeader>
          <ACardTitle>Login</ACardTitle>
          <ACardDescription>
            Please enter your username and password to access your account.
          </ACardDescription>
        </ACardHeader>
        <ACardContent className="flex flex-col space-y-2">
          <AFormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <AFormItem>
                <AFormLabel>Username</AFormLabel>
                <AFormControl>
                  <AInput placeholder="Username" {...field} />
                </AFormControl>
                <AFormMessage />
              </AFormItem>
            )}
          />
          <AFormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AFormItem>
                <AFormLabel>Password</AFormLabel>
                <AFormControl>
                  <AInput
                    placeholder="******"
                    type="password"
                    autoComplete="false"
                    {...field}
                  />
                </AFormControl>
                <AFormMessage />
              </AFormItem>
            )}
          />
        </ACardContent>
        <ACardFooter className="flex justify-between">
          <AButton type="reset" variant="outline">
            Cancel
          </AButton>
          <AButton type="submit" disabled={isPending} loading={isPending}>
            Sign In
          </AButton>
        </ACardFooter>
      </form>
    </AForm>
  );
};
