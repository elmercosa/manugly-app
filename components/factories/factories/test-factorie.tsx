"use client";

import { useState } from "react";
import Factory from "@/components/factories/factory";
import { type } from "os";
export default function TestFactorie() {
  const [components, setComponents] = useState(new Array());
  const [selected, setSelected] = useState<string>("");
  const addComponent = () => {
    setComponents([...components, selected]);
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelected(event.target.value);
  };
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <div className="flex">
        <select
          name="component"
          id="component"
          value={selected}
          onChange={handleChange}
        >
          <option value="">Selecciona un componente</option>
          <option value="Text">Texto corto</option>
          <option value="Number">Número</option>
          <option value="date">Fecha</option>
          <option value="time">Hora</option>
        </select>
        <button onClick={addComponent}>Añadir</button>
      </div>
      <div className="flex flex-col w-full">
        <Factory type="Text"></Factory>
        <Factory type="Number"></Factory>
        {components.map((card) => (
          <Factory type={card} key={card} />
        ))}
      </div>
    </div>
  );
}
