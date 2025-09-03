"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/", icon: "/icons/home.png" },
    { name: "Mentors", path: "/mentors", icon: "/icons/mentor.png" },
    { name: "Careers", path: "/career", icon: "/icons/career.png" },
    { name: "Contact", path: "/contact", icon: "/icons/contact.png" },
  ];

  return (
    <aside
      className="
        bg-white border-t md:border-r 
        md:w-40 md:min-h-screen 
        flex md:flex-col 
        items-center justify-between p-1 md:p-0
        md:py-6
        fixed bottom-0 md:static w-full 
        z-50
      "
    >
      <nav
        className="
          flex md:flex-col justify-around items-center 
          w-full gap-1 md:gap-6
        "
      >
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`w-full ${
                isActive
                  ? " text-green-600 font-semibold  md:border-r-4   border-green-600 "
                  : "hover:bg-gray-100"
              }`}
            >
              <div
                className={`flex flex-col items-center justify-center gap-1 px-3 w-[80%] mx-auto py-3 rounded-xl cursor-pointer
                  ${
                    isActive
                      ? "bg-green-100 text-green-600 font-semibold "
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-xs md:text-sm">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
