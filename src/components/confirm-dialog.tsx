import { createContext, ReactNode, useContext, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import type { buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";

type ConfirmOptions = {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  confirmButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
};
type ConfirmContextType = {
  confirm: (options?: ConfirmOptions) => Promise<boolean>;
};
type ConfirmDialogProviderProps = {
  children: ReactNode;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmDialogProvider(props: ConfirmDialogProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);
  const [options, setOptions] = useState<ConfirmOptions>();

  const confirm = (options?: ConfirmOptions) => {
    if (options) setOptions(options);
    console.log(options);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    resolveRef.current?.(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {props.children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>{options?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)}>{options?.cancelText}</AlertDialogCancel>
            <AlertDialogAction variant={options?.confirmButtonVariant ?? "default"} onClick={() => handleClose(true)}>
              {options?.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within ConfirmDialogProvider");
  }
  return context.confirm;
}
