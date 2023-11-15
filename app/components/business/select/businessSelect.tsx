"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconSwitchVertical } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { Loader } from "@/components/loader";
import { businessService } from "@/services/businessService";

export default function BusinessSelect() {
  const businessContext = useBusiness();

  const { data: session, status } = useSession();
  const user: any = session?.user || [];

  const getBusiness = useQuery({
    queryKey: ["get-business", user.id],
    queryFn: () => businessService.getBusiness(user.id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleChange = (key: any) => {
    const business = getBusiness.data?.find(
      (business: any) => business.id === key,
    );
    businessContext.dispatch({ type: "set", data: business });
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center w-full px-5 mb-4">
      <Dropdown>
        <DropdownTrigger>
          <Button
            isLoading={getBusiness.isLoading}
            className="w-full font-semibold text-white bg-primary"
            endContent={<IconSwitchVertical size={16} />}
          >
            {businessContext.state.business.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handleChange}>
          {getBusiness.data?.map((business: any) => (
            <DropdownItem key={business.id}>{business.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
