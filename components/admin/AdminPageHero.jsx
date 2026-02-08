export default function AdminPageHero({ title, description }) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
