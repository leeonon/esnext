export default function UserLayoutTitle({
  children,
  title,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-thin text-default-700">{title}</h1>
      {children}
    </div>
  );
}
