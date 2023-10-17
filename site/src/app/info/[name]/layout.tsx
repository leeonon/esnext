export default function InfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>嗷嗷嗷</h1>
      {children}
    </section>
  );
}
