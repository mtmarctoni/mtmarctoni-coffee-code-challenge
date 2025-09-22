import React from "react";
import { CloseIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function Dialog({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="relative flex flex-col justify-center bg-bg-alt w-full max-w-[714px] min-h-screen  md:min-h-[750px] m-auto md:justify-center p-6 md:p-30 overflow-hidden">
        <Link
          href="/"
          className="absolute text-3xl top-5 right-5 md:top-10 md:right-10 text-text hover:scale-115 hover:text-accent-muted"
        >
          <CloseIcon className="w-10 h-10" />
        </Link>
        <h2 className="text-6xl font-primary text-center">Create new</h2>

        {children}
        <div className="absolute -left-26 -bottom-10 w-72 h-72 pointer-events-none md:block hidden">
          <Image
            src="/coffe-beans-unit.webp"
            alt="Coffee beans"
            fill
            className="object-contain rotate-32"
            priority
          />
        </div>
      </div>
    </div>
  );
}
