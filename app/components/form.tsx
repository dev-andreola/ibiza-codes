import { Button } from "@/components/ui/button";

const Formulario = () => {
  return (
    <form action="">
      <label htmlFor="fname">Nome:</label>
      <input
        className="w-full rounded-sm border-2 p-2"
        type="text"
        id="fname"
        name="fname"
      />
      <label htmlFor="faddress">Endereço:</label>
      <input
        className="w-full rounded-sm border-2 p-2"
        type="text"
        id="faddress"
        name="faddress"
      />
      <label htmlFor="fcode">Código:</label>
      <input
        className="w-full rounded-sm border-2 p-2"
        type="text"
        id="fcode"
        name="fcode"
      />
      <Button type="submit" className="mt-2 w-full">
        Cadastrar
      </Button>
    </form>
  );
};

export default Formulario;
