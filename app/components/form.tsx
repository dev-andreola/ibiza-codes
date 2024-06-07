"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type FormProps = {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (user: any) => void;
};

const Form: React.FC<FormProps> = ({ onSuccess }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, code }),
    });

    if (res.ok) {
      const data = await res.json();
      onSuccess(data.user);
      setName("");
      setAddress("");
      setCode("");
      setIsLoading(false);
      console.log("User created successfully");
    } else {
      console.error("Failed to create user");
    }
  };

  return (
    <form className="relative flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        className="mb-3 rounded-sm border-2 px-2 py-1"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="address">Endereço</label>
      <input
        className="mb-3 rounded-sm border-2 px-2 py-1"
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <label htmlFor="code">Código</label>
      <input
        className="mb-5 rounded-sm border-2 px-2 py-1"
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="mb-5 h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default Form;
