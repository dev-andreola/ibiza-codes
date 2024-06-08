"use client";

import { useState, useEffect } from "react";
import UsersList from "./components/users-list";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader, UserPlus, Bike } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./components/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  address: string;
  code: string;
  createdAt: string;
};

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data.users);
    setIsLoadingUsers(false);
  };

  const handleAddUser = async (newUser: User) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const data = await res.json();
        setUsers((prevUsers) => [...prevUsers, data.user]);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-between px-2 py-6">
      <div className="flex w-full flex-col items-center justify-start">
        {/* TÍTULO */}

        <h1 className="text-center text-3xl font-bold">Ibiza Codes</h1>

        {/* BARRA DE PESQUISA */}

        <form className="mx-auto mt-3 flex w-[300px] gap-2">
          <Input placeholder="Buscar clientes" />
          <Button size={"icon"} type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>

        {/* LISTA DE CLIENTES */}
      </div>

      <div className="my-3 flex h-full w-full flex-col gap-2 overflow-y-scroll">
        {!isLoadingUsers && users.length == 0 && (
          <p className="mt-4 text-center text-sm text-gray-400">
            Nenhum cliente cadastrado!
          </p>
        )}
        {isLoadingUsers && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader className="mb-5 h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <UsersList users={users} onDelete={handleDeleteUser} />
      </div>

      {/* BOTÃO DE CADASTRAR NOVO CLIENTE */}

      <div className="flex w-full items-center justify-center gap-3 pt-3 text-center">
        <Link
          target="_blank"
          href={"https://confirmacao-entrega-propria.ifood.com.br/"}
        >
          <Button
            disabled={isLoadingUsers}
            className="flex h-12 items-center justify-center gap-2 bg-red-600 text-left hover:bg-red-700"
          >
            <Bike />
            Confirmar
            <br />
            código iFood
          </Button>
        </Link>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
        >
          <DialogTrigger>
            <Button
              className="flex h-12 items-center justify-center gap-2 text-left"
              disabled={isLoadingUsers}
            >
              <UserPlus /> Cadastrar
              <br />
              novo cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <DialogHeader>
              <DialogTitle>Cadastrar novo Cliente</DialogTitle>
              <DialogDescription>
                Insira os dados para cadastrar um novo código de cliente no
                banco de dados.
              </DialogDescription>
            </DialogHeader>
            <Form onSuccess={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
