import React from "react";
import { CloseIcon } from "./icons";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Dialog({ children }: Props) {

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div
        className="relative flex flex-col bg-bg-alt w-full max-w-[714px] max-h-[750px] m-auto justify-center p-30"
      >
              <Link
                  href="/"
                  className="absolute text-3xl top-10 right-10 text-text hover:scale-115 hover:text-accent-muted" >
            <CloseIcon className="w-10 h-10" />
          </Link>
        <h2 className="text-6xl font-primary text-center">Create new</h2>

        {children}

      </div>
    </div>
  );
}
