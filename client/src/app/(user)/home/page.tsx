import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "../../../components/navbar.css"

export default async function HomePage() {

    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   redirect("/");
    // }

  return (
    <main className="h-full w-full">
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
