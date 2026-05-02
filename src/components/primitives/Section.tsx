import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || description) && (
          <div className="mb-14 max-w-3xl">
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background-elev/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent">
                  <span className="pulse-dot text-accent" />
                </span>
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
