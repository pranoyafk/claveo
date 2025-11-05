type PageHedaerProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export function PageHeader(props: PageHedaerProps) {
  return (
    <section className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{props.title}</h1>
        <p className="text-muted-foreground text-sm">{props.description}</p>
      </div>
      {props.children}
    </section>
  );
}
