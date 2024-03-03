'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumnsData?: Record<string, string[]>;
  search?: { column: string; placeholder?: string };
}

export function DataTableToolbar<TData>({
  table,
  search,
  filterColumnsData = {},
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const filterColumns = Object.keys(filterColumnsData);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {search?.column && (
          <Input
            placeholder={search.placeholder ?? `Filter...`}
            value={
              (table.getColumn(search.column)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(search.column)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterColumns.map((column) => {
          const columnData = table.getColumn(column);
          return columnData ? (
            <DataTableFacetedFilter
              key={column}
              column={columnData}
              title={column}
              options={
                filterColumnsData[column]?.map((value) => ({
                  label: value,
                  value,
                })) ?? []
              }
            />
          ) : null;
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
