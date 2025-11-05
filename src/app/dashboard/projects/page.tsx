import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { PageHeader } from "../_components/page-header";

export default function Page() {
  return (
    <main className="my-6 container px-4 md:px-6 lg:px-8 xl:px-10">
      <PageHeader title="Projects" description="Create and manage your projects here.">
        <Button>
          <IconPlus />
          Add New
        </Button>
      </PageHeader>
    </main>
  );
}
