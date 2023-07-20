"use client";

import Image from "next/image";
import { Product } from "@/services/product";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "Id",
    header: () => <div className="text-center">Id</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.id}</div>;
    },
  },
  {
    accessorKey: "Title",
    header: () => <div className="text-center">Title</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.title}</div>;
    },
  },
  {
    accessorKey: "Price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.price}</div>;
    },
  },
  {
    accessorKey: "Discount Percent",
    header: () => <div className="text-center">Discount Percent</div>,
    cell: ({ row: { original } }) => {
      return (
        <div className="text-center font-medium">
          {original.discountPercentage}
        </div>
      );
    },
  },
  {
    accessorKey: "Rating",
    header: () => <div className="text-center">Rating</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.rating}</div>;
    },
  },
  {
    accessorKey: "Brand",
    header: () => <div className="text-center">Brand</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.brand}</div>;
    },
  },
  {
    accessorKey: "Stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.stock}</div>;
    },
  },
  {
    accessorKey: "Category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.category}</div>;
    },
  },
  {
    accessorKey: "Thumbnail",
    header: () => <div className="text-center">Thumbnail</div>,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-center">
          <div style={{ width: "50px", height: "30px", position: "relative" }}>
            <Image alt="product-image" src={original.thumbnail} fill />
          </div>
        </div>
      );
    },
  },
];
