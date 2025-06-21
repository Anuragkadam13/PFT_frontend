import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "@/assets/logo.png";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserContext from "@/context/user/UserContext";

const Navbar = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const menuItems = [
    {
      id: "1",
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: "/",
    },
    {
      id: "2",
      name: "Income",
      icon: <BanknoteArrowUp />,
      link: "/income",
    },
    {
      id: "3",
      name: "Expense",
      icon: <BanknoteArrowDown />,
      link: "/expense",
    },
    {
      id: "4",
      name: "Logout",
      icon: <LogOut />,
    },
  ];
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed w-full z-10  ">
      <nav className="px-2 sm:px-5 py-2 flex items-center justify-between font-medium shadow bg-white dark:bg-[#0A0A0A] dark:border-b">
        <div className="flex items-center gap-2 ">
          <img src={logo} className="h-12 md:h-14" alt="" />
          <h1 className="text-[24px] md:text-[26px] flex flex-col font-semibold justify-center leading-6">
            Finance Tracker{" "}
            <span className="text-lg text-[#1876D2] leading-6">
              Personal Finance
            </span>
          </h1>
        </div>

        {localStorage.getItem("token") ? (
          <div>
            <div className="flex md:hidden items-center">
              <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  {!isOpen ? (
                    <Menu className="w-fit h-7" />
                  ) : (
                    <X className="w-fit h-7" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  {menuItems.map((item) => {
                    return item.name == "Logout" ? (
                      <div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} key={item.id}>
                          {item.icon}
                          {item.name}
                        </DropdownMenuItem>
                      </div>
                    ) : (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => navigate(item.link)}
                      >
                        {item.icon}
                        {item.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden md:flex justify-center items-center">
              {menuItems.map((item) => {
                return item.name == "Logout" ? (
                  <Button
                    className="hover:cursor-pointer ml-2 "
                    variant="secondary"
                    onClick={handleLogout}
                    key={item.id}
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                ) : (
                  <NavLink
                    to={item.link}
                    key={item.id}
                    className={({ isActive }) =>
                      isActive
                        ? "flex gap-2 text-white bg-blue-500 px-4 py-2 rounded-md text-sm items-center"
                        : "flex gap-2 px-4 py-2 text-sm items-center"
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Navbar;
