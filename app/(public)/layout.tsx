import type { ReactNode } from "react";
import { HeaderSection } from "@/components/public/header";

interface PublicLayoutProps {
  children: ReactNode;
}
export default function PublicLayout(props: PublicLayoutProps) {
  return (
    <>
      <HeaderSection />
      {props.children}
    </>
  );
}
