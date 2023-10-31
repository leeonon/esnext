export default function UserLayoutTitle({
  children,
  title,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-default-700 text-2xl font-thin'>{title}</h1>
      {children}
    </div>
  );
}
