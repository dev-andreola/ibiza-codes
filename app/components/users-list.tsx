"use client";

import { Trash } from "lucide-react";

type User = {
  id: number;
  name: string;
  address: string;
  code: string;
  createdAt: string;
};

type UsersListProps = {
  users: User[];
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: number) => void; // Prop para notificar o componente pai sobre a exclusão
};

const UsersList: React.FC<UsersListProps> = ({ users, onDelete }) => {
  // Definimos a função handleDelete dentro do componente
  const handleDelete = async (id: number) => {
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Passamos o id no corpo da requisição
    });

    if (res.ok) {
      onDelete(id); // Notifica o componente pai para atualizar a lista de usuários
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <>
      {users.map((user) => (
        <div
          className="flex w-[500px] cursor-pointer items-center justify-between rounded-md border-2 px-4 py-2 hover:bg-gray-100"
          key={user.id}
        >
          <div className="w-[420px]">
            <h2 className="overflow-x-scroll text-xl font-bold scrollbar-none">
              {user.name}
            </h2>
            <p className="overflow-x-scroll scrollbar-none">{user.address}</p>
            <p className="overflow-x-scroll text-lg font-bold scrollbar-none">
              {user.code}
            </p>
          </div>
          <Trash
            onClick={() => handleDelete(user.id)} // Passamos o ID do usuário a ser deletado
            className="text-red-500 hover:text-red-700"
          />
        </div>
      ))}
    </>
  );
};

export default UsersList;
