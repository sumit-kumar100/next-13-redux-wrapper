"use client";

import { Todo } from "@/services/todo";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "Id",
    header: () => <div className="text-center">Id</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.id}</div>;
    },
  },
  {
    accessorKey: "Todo",
    header: () => <div className="text-center">Todo</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.todo}</div>;
    },
  },
  {
    accessorKey: "Completed",
    header: () => <div className="text-center">Completed</div>,
    cell: ({ row: { original } }) => {
      return (
        <div className="text-center font-medium">
          {original.completed ? "True" : "False"}
        </div>
      );
    },
  },
  {
    accessorKey: "UserId",
    header: () => <div className="text-center">UserId</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.userId}</div>;
    },
  },
];
