import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ROLE } from "@/common/role.enums";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function LoggedDefaultLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.profile.role === ROLE.DEFAULT) {
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
