'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter groceries..."
          value={
            (table.getColumn('productName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('productName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="Category"
            // TODO: Replace with actual category values
            options={[
              { label: 'Fruits', value: 'Fruits' },
              { label: 'Vegetables', value: 'Vegetables' },
              { label: 'Dairy', value: 'Dairy' },
            ]}
          />
        )}
        {table.getColumn('brand') && (
          <DataTableFacetedFilter
            column={table.getColumn('brand')}
            title="Brand"
            // TODO: Replace with actual brand values
            options={[
              { label: 'Dole', value: 'Dole' },
              { label: 'Chiquita', value: 'Chiquita' },
              { label: 'Brand', value: 'Brand' },
            ]}
          />
        )}
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
