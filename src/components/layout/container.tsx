export default function Container({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <div {...props}>{children}</div>;
}
