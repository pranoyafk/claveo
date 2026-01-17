import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { IconChevronDown, IconUpload } from "@tabler/icons-react";
import { useProject } from "../hooks/use-project";
import { ProjectCardAction } from "./project-card-action";

export function ProjectActionButton() {
  const project = useProject();
  return (
    <ButtonGroup>
      <Button size="lg" variant="outline">
        <IconUpload /> Push New Update
      </Button>
      <ProjectCardAction projectSlug={project.slug}>
        <Button size="icon-lg" variant="outline">
          <IconChevronDown />
        </Button>
      </ProjectCardAction>
    </ButtonGroup>
  );
}
