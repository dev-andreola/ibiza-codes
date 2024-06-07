"use client";

import { Trash2 } from "lucide-react";

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
      {users.length ? (
        users.map((user) => (
          <div key={user.id} className="flex w-full rounded-md border-2">
            <div className="w-3/4 px-2 py-1">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="">{user.address}</p>
              <p className="text-xl font-bold">{user.code}</p>
            </div>
            <div className="flex w-1/4 items-center justify-center rounded-br-md rounded-tr-md bg-red-200 hover:bg-red-300">
              <Trash2
                onClick={() => handleDelete(user.id)}
                className="text-red-600"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="mt-4 text-center text-gray-400">
          Nenhum cliente cadastrado.
        </p>
      )}
    </>
  );
};

export default UsersList;
