"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      onDelete(id);
      setIsLoading(false);
      setIsDialogOpen(false);
      toast({
        title: "Deletado!",
        description: "Cliente deletado com sucesso!",
      });
    } else {
      console.error("Failed to delete user");
    }
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              onClick={() => openDeleteDialog(user)}
              className="flex w-1/4 cursor-pointer items-center justify-center rounded-br-sm rounded-tr-sm bg-red-200 hover:bg-red-300"
            >
              <div>
                <Trash2 className="text-red-600" />
              </div>
            </DialogTrigger>
            <DialogContent className="w-[350px] rounded-md">
              <DialogTitle>
                Tem certeza que deseja deletar o cliente {selectedUser?.name}?
              </DialogTitle>
              <DialogDescription>
                O cliente será apagado <strong>permanentemente</strong>!
              </DialogDescription>
              {isLoading && (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
              <div className="flex w-full gap-2">
                <Button
                  className="w-2/4"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Não
                </Button>
                <Button
                  className="w-2/4 bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  Sim
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </>
  );
};

export default UsersList;
