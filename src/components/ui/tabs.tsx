import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2 ", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground flex h-10 w-full items-center justify-start rounded-xl p-5.5",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
       " group relative px-5 h-10  justify-start bg-white  text-[#445A64]  font-semibold rounded-full  py-2 flex items-center gap-5 data-[state=active]:bg-[#ef4444] data-[state=active]:text-white text-sm data-[state=active]:after:content-['']  data-[state=active]:after:absolute  data-[state=active]:after:top-full  data-[state=active]:after:left-1/2  data-[state=active]:after:-translate-x-1/2  data-[state=active]:after:border-l-[10px]  data-[state=active]:after:border-r-[10px]  data-[state=active]:after:border-t-[8px]  data-[state=active]:after:border-l-transparent  data-[state=active]:after:border-r-transparent  data-[state=active]:after:border-t-[#ef4444]",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
