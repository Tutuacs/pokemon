import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <Navbar type={session.profile.role} />
      {children}
      <Footer />
    </main>
  );
}
