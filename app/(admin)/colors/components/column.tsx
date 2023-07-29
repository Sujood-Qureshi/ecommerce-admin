"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorsColumn = {
    id: string
    color: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<ColorsColumn>[] = [
    {
        accessorKey: "color",
        header: "Color",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({row}) => (
            <div className="flex items-center gap-x-2">
                {row.original.value}
                <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}}/>
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "action",
        cell: ({row})=> <CellAction data={row.original}/>,
    },
]
