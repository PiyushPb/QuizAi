import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full border-b-[1px]">
      <div className="w-full container mx-auto py-5 px-3 flex justify-between items-center">
        <Link href={"/"}>
          <div className="border-[2px] border-black text-gray-900 w-fit py-1 px-4 text-[20px] font-bold rounded-xl border-b-[6px] border-r-[6px] cursor-pointer">
            <h1 className="text-black">
              Quiz<span className="text-blue-500">AI</span>
            </h1>
          </div>
        </Link>

        {!session ? (
          <div>
            <Button>Sign In</Button>
          </div>
        ) : (
          <div className="relative">
            <Avatar onClick={toggleDropdown}>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
