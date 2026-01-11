import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useActiveOrganization } from "@/features/organizations/hooks/use-active-organization";
import { IconDots, IconEdit, IconPlayerPause, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { projectMutations, projectsQueries } from "../queries";
import { useConfirm } from "@/components/confirm-dialog";

type ProjectCardActionProps = {
  projectSlug: string;
};
export function ProjectCardAction(props: ProjectCardActionProps) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const activeOrg = useActiveOrganization();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteProjectMutation = useMutation({
    ...projectMutations.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectsQueries.byOrganization(activeOrg.slug).queryKey,
      });
      setIsOpen(false);
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground/50 hover:text-foreground -mt-1 -mr-2"
          />
        }
      >
        <IconDots className="size-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <IconEdit className="mr-2 size-3.5" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlayerPause className="mr-2 size-3.5" /> Pause
        </DropdownMenuItem>
        <DropdownMenuItem
          closeOnClick={false}
          onClick={async () => {
            const confirmDelete = await confirm({
              title: "Permanently delete project?",
              description:
                "This action cannot be undone. The project and all associated resources will be permanently removed from the organization.",
              confirmText: "Yes, delete",
              cancelText: "No, keep project",
              confirmButtonVariant: "destructive",
            });
            if (confirmDelete)
              deleteProjectMutation.mutateAsync({
                data: {
                  organizationSlug: activeOrg.slug,
                  projectSlug: props.projectSlug,
                },
              });
          }}
          className="text-destructive focus:text-destructive"
        >
          {deleteProjectMutation.isPending ? (
            <Spinner className="mr-2 size-3.5" />
          ) : (
            <IconTrash className="mr-2 size-3.5" />
          )}{" "}
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
