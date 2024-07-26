import { authOptions } from "@/utils/authOptions";
import "../../../components/navbar.css"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {

    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/");
    }

  return (
    <main>
      <div>
        <h1 className="text-white">Home Page1</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
        <h1 className="text-white">Home Page</h1>
      </div>
    </main>
  );
}
