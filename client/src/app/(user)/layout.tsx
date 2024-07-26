import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Navbar from "@/components/Navbar";
import "../../components/navbar.css"

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: PrivateLayoutProps) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/");
  // }

  return (
    <>
      <main>
        <Navbar  type={2} logged={Boolean(true)}/>
        {children}
      </main>
    </>
  );
}
