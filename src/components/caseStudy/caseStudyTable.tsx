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

type BlogRow = {
    id: number
    description: string
    category: string
    publishedOn: string
    publishedBy: string
    status: "Active" | "Inactive"
    lastUpdated: string
  }
  

  const rawData: BlogRow[] = [
    {
      id: 1,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Plastic Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 2,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Plastic Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 3,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Reconstructive Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Inactive",
      lastUpdated: "2025-05-12",
    },
    {
      id: 4,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Neuro Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Inactive",
      lastUpdated: "2025-05-12",
    },
    {
      id: 5,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Plastic Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 6,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Plastic Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 7,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Plastic Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 8,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Reconstructive Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 9,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Others",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
    {
      id: 10,
      description: "The Future of Healthcare: How Technology is Transforming...",
      category: "Reconstructive Surgery",
      publishedOn: "2025-05-12",
      publishedBy: "Admin",
      status: "Active",
      lastUpdated: "2025-05-12",
    },
  ]
  
  

  const columns: ColumnDef<BlogRow>[] = [
    {
      header: "Sl No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "description",
      header: "Case Studies",
      cell: ({ row }) => (
        <p className="max-w-[280px] truncate">
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: "category",
      header: "Case Study Category",
    },
    {
      accessorKey: "publishedOn",
      header: "Published On",
      cell: ({ row }) =>
        format(new Date(row.original.publishedOn), "dd-MM-yyyy"),
    },
    {
      accessorKey: "publishedBy",
      header: "Published By",
    },
    {
      accessorKey: "status",
      header: "Case Status",
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
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) =>
        format(new Date(row.original.lastUpdated), "dd-MM-yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      ),
    },
  ]
  

export default function CaseStudyTable() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<"all" | "Active" | "Inactive">(
    "all"
  );
  const [date, setDate] = React.useState<Date | undefined>();

  const filteredData = React.useMemo(() => {
    return rawData.filter((item) => {
      const matchSearch =
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.publishedBy.toLowerCase().includes(search.toLowerCase())
  
      const matchStatus = status === "all" || item.status === status
      const matchDate =
        !date || item.publishedOn === format(date, "yyyy-MM-dd")
  
      return matchSearch && matchStatus && matchDate
    })
  }, [search, status, date])
  
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
