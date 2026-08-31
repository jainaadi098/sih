import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Home, LogIn, Info, BookOpen, HelpCircle, Languages } from "lucide-react";

export function OverflowMenu() {
  const menuItems = [
    { name: "Login", href: "/login", icon: LogIn },
    { name: "About", href: "/about", icon: Info },
    { name: "Information", href: "/information", icon: BookOpen },
    { name: "Guide", href: "/guide", icon: HelpCircle },
    { name: "Language", href: "/language", icon: Languages },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border border-border shadow-strong">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.name}>
              <DropdownMenuItem asChild>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 px-2 py-2 text-sm cursor-pointer hover:bg-muted/50"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
              {index === 1 && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}