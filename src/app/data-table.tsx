import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DebouncedInput } from './debounced-input';
import { Data, data } from './data';
export function DataTable() {
  const columns: Array<ColumnDef<Data>> = useMemo(
    () => [
      {
        accessorKey: 'id',
      },
      {
        accessorKey: 'name',
        cell({ row }) {
          return (
            <div className="border-0 rounded-md">
              <div className="p-3">
                <p className="break-all">{row.getValue('name')}</p>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const getRowId = (row: Data) => row.id ?? '';
  const [searchTerm, setSearchTerm] = useState('');
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
    getRowId,
    state: {
      globalFilter: searchTerm,
    },
  });

  return (
    <>
      <DebouncedInput
        data-testid="debounced-input"
        type="text"
        className="p-1 mr-2 mb-2"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr className="cursor-pointer" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
