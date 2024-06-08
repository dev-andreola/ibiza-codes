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
  onDelete: (id: number) => void;
};

const UsersList: React.FC<UsersListProps> = ({ users, onDelete }) => {
  const handleDelete = async (id: number) => {
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      onDelete(id);
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="flex w-full rounded-md border-2">
          <div className="w-3/4 px-2 py-1">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="">{user.address}</p>
            <p className="text-xl font-bold">{user.code}</p>
          </div>
          <div
            onClick={() => handleDelete(user.id)}
            className="flex w-1/4 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md bg-red-200 hover:bg-red-300"
          >
            <Trash2 className="text-red-600" />
          </div>
        </div>
      ))}
    </>
  );
};

export default UsersList;
