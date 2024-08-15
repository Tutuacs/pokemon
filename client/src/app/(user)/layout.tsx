// UserLayout.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Navbar from "@/components/Navbar";
import "../../components/navbar.css";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  let role = -1;

  if (session?.profile) {
    if (session.profile.role != undefined) {
      role = session.profile!.role || -1;
    }
  }

  const type = role;
  const logged = type !== -1;

  return (
    <main>
      <Navbar logged={logged}/>
      <div className="mt-28">{children}</div>
    </main>
  );
}
