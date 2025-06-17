import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "@/assets/logo.png";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Navbar = () => {
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
              <Popover onOpenChange={setIsOpen}>
                <PopoverTrigger className="hover:cursor-pointer border-2  rounded">
                  {!isOpen ? (
                    <Menu className="w-fit h-7" />
                  ) : (
                    <X className="w-fit h-7" />
                  )}
                </PopoverTrigger>
                <PopoverContent className="md:hidden gap-2 flex flex-col">
                  {menuItems.map((item) => {
                    return item.name == "Logout" ? (
                      <div>
                        <Separator className="mb-2" />
                        <Button
                          className="hover:cursor-pointer w-full"
                          variant="secondary"
                          onClick={handleLogout}
                          key={item.id}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      </div>
                    ) : (
                      <NavLink
                        to={item.link}
                        key={item.id}
                        className={({ isActive }) =>
                          isActive
                            ? "flex gap-4 text-white bg-blue-500 px-4 py-2 rounded-md"
                            : "flex gap-4 px-4 py-2"
                        }
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    );
                  })}
                </PopoverContent>
              </Popover>
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
