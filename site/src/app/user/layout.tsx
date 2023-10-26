import Sidebar from "./components/sidebar";

export const metadata = {
  title: "ESNext - User",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="mx-auto flex flex-1 flex-col overflow-hidden p-6">
        {children}
      </div>
    </div>
  );
}
