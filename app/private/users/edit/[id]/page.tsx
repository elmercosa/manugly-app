"use client";

import { Input, Skeleton, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { userService } from "@/services/userService";

export default function CreateTemplate({ params }: { params: { id: string } }) {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getUser(params.id);
      setUser(data);
      setIsLoaded(true);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col w-full gap-6 pb-10 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-5 shadow-md">
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h2 className="h-16 text-5xl font-bold">
            {user.name} {user.surname}
          </h2>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <Input
            type="email"
            label="Email del usuario"
            labelPlacement="outside"
            value={user.email}
            readOnly
          />
        </Skeleton>

        <Textarea
          label="Descripción"
          labelPlacement="outside"
          placeholder="Enter your description"
        />
      </div>
    </div>
  );
}
