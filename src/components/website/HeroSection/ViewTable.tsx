import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, MoreVertical, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import LeftArrow from "@/components/icons/LeftArrow";

type UpdateLog = {
  id: number;
  description: string;
  version: "Desktop" | "Mobile";
  status: "Active" | "Inactive";
  updatedBy: string;
  updatedAt: string;
};

const rawData: UpdateLog[] = [
  {
    id: 1,
    description: "Hero banner change",
    version: "Mobile",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-12",
  },
  {
    id: 2,
    description: "Hero banner change",
    version: "Mobile",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-12",
  },
  {
    id: 3,
    description: "Case studies update",
    version: "Desktop",
    status: "Inactive",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 4,
    description: "Blog updates",
    version: "Desktop",
    status: "Inactive",
    updatedBy: "Admin",
    updatedAt: "2025-05-10",
  },
  {
    id: 5,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 6,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 7,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 8,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 9,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 10,
    description: "Blog updates",
    version: "Desktop",
    status: "Active",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
  {
    id: 11,
    description: "Blog updates",
    version: "Desktop",
    status: "Inactive",
    updatedBy: "Admin",
    updatedAt: "2025-05-11",
  },
];

const columns: ColumnDef<UpdateLog>[] = [
  { header: "Sl No.", cell: ({ row }) => row.index + 1 },
  { accessorKey: "description", header: "Update description" },
  { accessorKey: "version", header: "Version" },
  {
    accessorKey: "status",
    header: "Live Status",
    cell: ({ row }) => (
      <span
        className={cn(
          " rounded-full text-sm font-medium text-center",
          row.original.status === "Active"
            ? "bg-[#0ACA74] text-white px-5.5 py-1 "
            : "bg-[#FD9809] text-white px-4.5 py-1 "
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  { accessorKey: "updatedBy", header: "Updated By" },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => format(new Date(row.original.updatedAt), "dd-MM-yyyy"),
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <button className="p-2 bg-gray-100 rounded-full">
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    ),
  },
];

export default function ViewTable() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<"all" | "Active" | "Inactive">(
    "all"
  );
  const [date, setDate] = React.useState<Date | undefined>();

  const filteredData = React.useMemo(() => {
    return rawData.filter((item) => {
      const matchSearch =
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.updatedBy.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || item.status === status;

      const matchDate = !date || item.updatedAt === format(date, "yyyy-MM-dd");

      return matchSearch && matchStatus && matchDate;
    });
  }, [search, status, date]);
   const navigate=useNavigate()
   const handleNavigate=()=>{
    navigate("/website")
   }
  return (
    <div className="space-y-4 ">
        <button className="ml-1 cursor-pointer" onClick={handleNavigate}>
       <LeftArrow />
       </button>
      {/* FILTER BAR */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-84 ">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-8 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right Filters */}
        <div className="flex items-center gap-3">
          {/* STATUS FILTER */}
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger className="w-[140px] rounded-full">
              <SelectValue placeholder="Show All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* DATE FILTER */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[160px] justify-start text-left font-normal rounded-full",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd-MM-yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                fromYear={2015}
                toYear={2035}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* TABLE */}
      <div className="px-1">
      <DataTable
        columns={columns}
        data={filteredData}
        initialPageSize={10}
        showPageSizeSelector
      />
      </div>
    </div>
  );
}
