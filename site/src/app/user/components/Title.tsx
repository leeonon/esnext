export default function UserLayoutTitle({
  children,
  title,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-muted-foreground text-xl font-medium'>{title}</h1>
      {children}
    </div>
  );
}
