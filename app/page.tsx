import { Input } from "@/components/ui/input";
import UsersList from "./components/users-list";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Formulario from "./components/form";

// Componente Home
const Home = async () => {
  return (
    <div className="relative h-screen">
      <div className="my-3">
        <h1 className="text-center text-3xl font-bold">Ibiza Codes</h1>
        <form className="mx-auto mt-3 flex w-[300px] gap-2">
          <Input placeholder="Buscar clientes" />
          <Button size={"icon"} type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </div>

      {/* USERS LIST */}
      <div className="mx-auto flex w-[500px] flex-col gap-3">
        <UsersList />
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="absolute bottom-10 left-2/4 -translate-x-2/4">
            Cadastrar novo Código
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar novo Código</DialogTitle>
            <DialogDescription>
              Insira os dados para cadastrar um novo código de cliente no banco
              de dados.
            </DialogDescription>
          </DialogHeader>
          <Formulario />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
