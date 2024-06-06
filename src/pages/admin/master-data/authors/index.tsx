import { useEffect } from "react";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/components/templates/container";
import { AButton } from "@/components/atoms/button";
import { AInput } from "@/components/atoms/input";
import { MDataTable } from "@/components/molecules/data-table";
import { IAuthorsResponse } from "@/services/authors/list.get";
import { formatDate } from "@/utils/date";
import { useAuthorListGet } from "@/hooks/master-data/authors/use-author-list-get";
import { PaginationMetaResponse } from "@/types/response";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

export const AuthorsIndex = () => {
  const { filter, setFilter, isPending, data: authors } = useAuthorListGet();
  const debounced = useDebounceCallback(setFilter, 500);

  useEffect(() => {
    setFilter({
      ...filter,
    });
  }, [filter]);

  const columns: ColumnDef<IAuthorsResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const author = row.original;
        return formatDate(author.created_at);
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        const author = row.original;
        return formatDate(author.updated_at);
      },
    },
  ];
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-2xl">Author's List</h3>
        <AButton size="sm" className="gap-x-2">
          <Plus className="w-4 h-4" />
          Add New Author
        </AButton>
      </div>
      <div className="flex items-center justify-between gap-x-4 shadow rounded p-4 mt-4">
        <AInput
          inputSize="sm"
          placeholder="Search name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounced({
              ...filter,
              name: e.target.value,
            })
          }
        ></AInput>
        <AButton size="sm" className="gap-x-2">
          Search
        </AButton>
      </div>
      <MDataTable
        columns={columns}
        data={authors?.data.data ?? []}
        meta={authors?.data.meta as PaginationMetaResponse}
        setFilter={setFilter}
        loading={isPending}
      />
    </Container>
  );
};
