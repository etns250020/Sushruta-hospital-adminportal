import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./icons/Logo";

const sidebarMenu = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Website", path: "/website", icon: Globe },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        "h-screen border-r transition-all duration-300 ease-in-out flex flex-col relative",
        "bg-sidebar text-sidebar-foreground",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2 py-1.6 border-b border-sidebar-border">
        {/* LEFT: Logo + Title */}
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Logo />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {sidebarMenu.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              location.pathname === menu.path ||
              location.pathname.startsWith(menu.path + "/");

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? menu.title : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">{menu.title}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
