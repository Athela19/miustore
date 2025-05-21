"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const noLayout = ["/Auth"];

export default function Appshell({ children }) {
  const pathname = usePathname();

  const hideLayout = noLayout.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
