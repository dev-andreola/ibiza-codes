"use client";

type User = {
  id: number;
  name: string;
  address: string;
  code: string;
  createdAt: string;
};

type UsersListProps = {
  users: User[];
};

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div
          className="w-[500px] cursor-pointer rounded-md border-2 px-4 py-2 hover:bg-gray-100"
          key={user.id}
        >
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.address}</p>
          <p className="text-lg font-bold">{user.code}</p>
        </div>
      ))}
    </>
  );
};

export default UsersList;
