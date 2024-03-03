'use client';

import dayjs from 'dayjs';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';

import { DataTableColumnHeader } from '~/components/ui/data-table/data-table-column-header';
import { DataTableRowActions } from '~/components/ui/data-table/data-table-row-actions';
import { type Grocery } from '~/app/dashboard/common-types';

export const columns: ColumnDef<Grocery>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[500px] items-center truncate font-medium">
          {row.renderValue('productName')}
        </div>
      );
    },
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center truncate font-medium">
          {row.renderValue('brand')}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'expirationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {dayjs(row.getValue('expirationDate')).format('dddd DD MMMM YY')}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">{row.renderValue('quantity')}</div>
      );
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => {
      if (!row.getValue('unit')) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge variant="outline">{row.getValue('unit')}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      if (!row.getValue('category')) {
        return null;
      }

      return (
        <div className="flex items-center">{row.getValue('category')}</div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
