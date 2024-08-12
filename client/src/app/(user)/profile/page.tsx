"use client";

import ProfileItem from "@/components/ProfileItem";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name: string;
  _count: {
    Pokemon: number;
  };
  email: string;
};

type ApiResponse = {
  profiles: UserProfile[];
  count: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { fetchWithAuth } = useFetch();

  // Função para buscar dados da API
  const fetchUsers = async (pageNumber: number) => {
    try {
      const response = await fetchWithAuth(`/profile/page/${pageNumber}`);
      if (response!.status === 200) {
        const data: ApiResponse = await response!.data;
        setUsers(data.profiles);
        setTotalCount(data.count);
      } else {
        console.error("Failed to fetch users:", response!.status);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Atualizar usuários quando a página mudar
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <div
          className="mx-auto h-20 p-4 min-h-10 mt-10 text-center justify-center w-2/4 text-white text-2xl font-bold rounded-t-lg"
          style={{ background: "rgba(40, 40, 40, 0.95)" }}
        >
          Gerenciar Usuários
        </div>
        <section className="mx-auto bg-white flex min-h-[800px] w-2/4 rounded-b-lg mb-10">
          <div className="m-4 w-full bg-gray-200 rounded-lg flex flex-col max-h-[800px] overflow-y-auto">
            {users.map((user) => (
              <ProfileItem key={user.id} profile={user} />
            ))}
          </div>
        </section>
        <div className="flex justify-center">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="mr-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={users.length === 0}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Próximo
          </button>
        </div>
      </div>
    </main>
  );
}
