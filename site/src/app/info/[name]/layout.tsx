export default function InfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="m-auto max-w-screen-2xl px-8">{children}</section>;
}
