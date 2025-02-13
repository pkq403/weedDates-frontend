
import { Navbar } from "@/components/Navbar";
import { subtitle } from "@/components/primitives";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-full">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-3 sm:px-5 flex-grow pt-8">
        {children}
      </main>
      <footer className={subtitle({class: "mt-4 text-center md:text-xl sm:test-sm text-white"})}>
        Written By pkq403
      </footer>
    </div>
  );
}
