"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconSwitchVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useBusiness } from "@/app/contexts/business/context";

export default function BusinessSelect({ mini }: { mini?: boolean }) {
  const businessContext = useBusiness();
  const [businesses, setBusinesses] = useState([]);

  const handleChange = (key: any) => {
    const business = businesses.find((business: any) => business.id === key);
    businessContext.dispatch({ type: "set", data: business });
    window.location.reload();
  };

  useEffect(() => {
    let businessesFromStorage = localStorage.getItem("businesses");
    if (businessesFromStorage !== null) {
      let businesses = JSON.parse(businessesFromStorage);
      setBusinesses(businesses);
    }
  }, [businessContext]);

  return (
    <div className="flex items-center justify-center w-full px-5 mb-4">
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="w-full font-semibold text-white bg-manugly"
            endContent={mini ? <></> : <IconSwitchVertical size={14} />}
          >
            {mini
              ? businessContext.state.business.name?.charAt(0)
              : businessContext.state.business.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handleChange}>
          {businesses.map((business: any) => (
            <DropdownItem key={business.id}>{business.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
