import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AButton } from "@/components/atoms/button";
import { ACard } from "@/components/atoms/card";
import {
  AForm,
  AFormControl,
  AFormField,
  AFormItem,
  AFormLabel,
  AFormMessage,
} from "@/components/atoms/form";
import { Container } from "@/components/templates/container";
import { currYear } from "@/utils/date";
import { useToast } from "@/components/atoms/toast/use-toast";
import { AInput } from "@/components/atoms/input";
import { ATextarea } from "@/components/atoms/textarea";
import { useCreateAuthorPost } from "@/hooks/master-data/authors/mutations/use-create-author-post";

const validationSchemaAuthorCreate = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "You must enter a name" }),
  birthYear: z
    .string({
      required_error: "Birth Year is required",
    })
    .min(0, { message: "You must enter a birth year" })
    .max(currYear, { message: "Too young" }),
  bio: z
    .string({ required_error: "Bio is required" })
    .min(1, { message: "You must enter a bio" }),
});

type ValidationSchemaAuthorCreate = z.infer<
  typeof validationSchemaAuthorCreate
>;

export const AuthorCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm<ValidationSchemaAuthorCreate>({
    resolver: zodResolver(validationSchemaAuthorCreate),
    defaultValues: {
      name: "",
      birthYear: currYear.toString(),
      bio: "",
    },
  });
  const { mutate } = useCreateAuthorPost({
    onSuccess: () => {
      toast.toast({
        title: "Create author success!",
      });

      navigate("/admin/master-data/authors");
    },
  });

  const onSubmit = (payload: ValidationSchemaAuthorCreate) => {
    mutate({
      ...payload,
      birthYear: parseInt(payload.birthYear),
    });
  };

  return (
    <Container>
      <h3 className="font-semibold text-2xl">Author Create</h3>
      <ACard className="p-4 mt-4">
        <AForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <AFormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <AFormItem>
                  <AFormLabel>Name</AFormLabel>
                  <AFormControl>
                    <AInput
                      placeholder="John Doe"
                      autoComplete="off"
                      {...field}
                    />
                  </AFormControl>
                  <AFormMessage />
                </AFormItem>
              )}
            />
            <AFormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <AFormItem>
                  <AFormLabel>Birth Year {typeof field.value}</AFormLabel>
                  <AFormControl>
                    <AInput
                      placeholder="1996"
                      autoComplete="off"
                      type="number"
                      {...field}
                    />
                  </AFormControl>
                  <AFormMessage />
                </AFormItem>
              )}
            />
            <AFormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <AFormItem>
                  <AFormLabel>Bio</AFormLabel>
                  <AFormControl>
                    <ATextarea
                      placeholder="Bio"
                      autoComplete="off"
                      {...field}
                    />
                  </AFormControl>
                  <AFormMessage />
                </AFormItem>
              )}
            />
            <AButton type="submit">Submit</AButton>
          </form>
        </AForm>
      </ACard>
    </Container>
  );
};
