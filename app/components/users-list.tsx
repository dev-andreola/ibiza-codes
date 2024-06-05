import prisma from "@/lib/db";

// Função para buscar usuários do banco de dados
const fetchUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const UsersList = async () => {
  const users = await fetchUsers();
  return (
    <>
      {users.map((user) => (
        <div
          className="w-[500px] cursor-pointer rounded-md border-2 px-4 py-2 hover:bg-gray-100"
          key={user.id}
        >
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.addrress}</p>
          <p className="text-lg font-bold">{user.code}</p>
        </div>
      ))}
    </>
  );
};

export default UsersList;
