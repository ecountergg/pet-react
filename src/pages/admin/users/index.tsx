import { useEffect } from "react";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";

import { setBreadrumbs } from "@/stores/breadcrumb";
import { Container } from "@/components/templates/container";
import { AButton } from "@/components/atoms/button";
import { AInput } from "@/components/atoms/input";
import { MDataTable } from "@/components/molecules/data-table";
import { IUsersResponse } from "@/services/users/list.get";
import { formatDate } from "@/utils/date";
import { useUserListGet } from "@/hooks/users/queries/use-user-list-get";
import { PaginationMetaResponse } from "@/types/response";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

export const UsersIndex = () => {
  const dispatch = useDispatch();
  const { filter, setFilter, data: users } = useUserListGet();
  const debounced = useDebounceCallback(setFilter, 500);

  useEffect(() => {
    setFilter({
      ...filter,
    });
  }, [filter]);

  useEffect(() => {
    dispatch(
      setBreadrumbs([
        {
          href: "#",
          label: "Users",
        },
      ])
    );
  }, []);

  const columns: ColumnDef<IUsersResponse>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const user = row.original;
        return formatDate(user.created_at);
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        const user = row.original;
        return formatDate(user.updated_at);
      },
    },
  ];
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-2xl">User's List</h3>
        <AButton size="sm" className="gap-x-2">
          <Plus className="w-4 h-4" />
          Add New User
        </AButton>
      </div>
      <div className="flex items-center justify-between gap-x-4 shadow rounded p-4 mt-4">
        <AInput
          inputSize="sm"
          placeholder="Search name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounced({
              ...filter,
              username: e.target.value,
            })
          }
        ></AInput>
        <AButton size="sm" className="gap-x-2">
          Search
        </AButton>
      </div>
      <MDataTable
        columns={columns}
        data={users?.data.data ?? []}
        meta={users?.data.meta as PaginationMetaResponse}
        setFilter={setFilter}
      />
    </Container>
  );
};
