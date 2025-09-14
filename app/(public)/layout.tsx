import type { ReactNode } from "react";
import { HeaderSection } from "./_components/header";

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
