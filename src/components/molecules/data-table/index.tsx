"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import {
  ATable,
  ATableBody,
  ATableCell,
  ATableHead,
  ATableHeader,
  ATableRow,
} from "@/components/atoms/table/index";
import {
  APagination,
  APaginationContent,
  APaginationEllipsis,
  APaginationItem,
  APaginationLink,
  APaginationNext,
  APaginationPrevious,
} from "@/components/atoms/pagination/index";
import { ACard } from "@/components/atoms/card/index";
import {
  ASelect,
  ASelectContent,
  ASelectItem,
  ASelectTrigger,
  ASelectValue,
} from "@/components/atoms/select/index";
import { LIMIT, LIMITS } from "@/consts/pagination";
import { SORT_DIRECTION } from "@/consts/request";
import { PaginationMetaResponse } from "@/types/response";
import { EnumSortDirection, PaginationFilter } from "@/types/request";

interface IPaginationDataTableProps {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const MPaginationPages = ({
  pageCount,
  pageIndex,
  pageSize,
  setPagination,
}: IPaginationDataTableProps): (JSX.Element | null)[] => {
  let isPageNumberOutOfRange: boolean;

  return [...new Array(pageCount)].map((_, index) => {
    const pageNumber = index;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pageCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - pageIndex) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <APaginationItem key={pageNumber}>
          <APaginationLink
            isActive={pageNumber === pageIndex}
            onClick={() =>
              setPagination({
                pageIndex: pageNumber,
                pageSize: pageSize,
              })
            }
          >
            {pageNumber + 1}
          </APaginationLink>
        </APaginationItem>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return (
        <APaginationItem key={pageNumber}>
          <APaginationEllipsis />
        </APaginationItem>
      );
    }

    return null;
  });
};

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: PaginationMetaResponse;
  setFilter: React.Dispatch<React.SetStateAction<PaginationFilter>>;
}

export const MDataTable = <TData, TValue>({
  columns,
  data,
  meta,
  setFilter,
}: IDataTableProps<TData, TValue>) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LIMIT,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    const sortingAtom = sorting[0];
    let order: EnumSortDirection | undefined;

    if (sortingAtom) {
      order = sortingAtom.desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
    } else {
      order = undefined;
    }

    setFilter({
      page: pageIndex + 1,
      limit: pageSize,
      order: order,
      orderBy: sortingAtom ? sortingAtom.id : undefined,
    });
  }, [pageIndex, pageSize, sorting, setFilter, setSorting]);

  const table = useReactTable({
    data: data ?? memoizedData,
    columns: memoizedColumns,
    pageCount: meta?.pageCount ?? -1,
    state: {
      pagination,
      sorting,
    },
    manualSorting: true,
    manualPagination: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <ACard className="mt-4">
        <ATable>
          <ATableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <ATableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <ATableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "select-none cursor-pointer flex items-center gap-1"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ArrowDown className="h-4 w-4 " />,
                            desc: <ArrowUp className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </ATableHead>
                  );
                })}
              </ATableRow>
            ))}
          </ATableHeader>
          <ATableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ATableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <ATableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </ATableCell>
                  ))}
                </ATableRow>
              ))
            ) : (
              <ATableRow>
                <ATableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </ATableCell>
              </ATableRow>
            )}
          </ATableBody>
        </ATable>
      </ACard>
      <APagination className="mt-4">
        <APaginationContent>
          <APaginationItem>
            <APaginationPrevious
              href="#"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            />
          </APaginationItem>
          <MPaginationPages
            pageCount={meta?.pageCount}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPagination={setPagination}
          />
          <APaginationItem>
            <APaginationNext
              href="#"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            />
          </APaginationItem>
        </APaginationContent>
        <ASelect
          name="limit"
          value={`${pageSize}`}
          onValueChange={(e) => {
            setPagination({
              pageIndex: 0,
              pageSize: parseInt(e),
            });
          }}
        >
          <ASelectTrigger className="w-[75px]">
            <ASelectValue placeholder="Limit" />
          </ASelectTrigger>
          <ASelectContent>
            {LIMITS.map((limit) => (
              <ASelectItem key={limit} value={`${limit}`}>
                {limit}
              </ASelectItem>
            ))}
          </ASelectContent>
        </ASelect>
      </APagination>
    </div>
  );
};
