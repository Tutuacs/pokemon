import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function LoggedDefaultLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.profile) {
    redirect("/login");
  }

  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
}
