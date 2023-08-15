import { CustomModal } from "@/components/modal/modal";
import { Backdrop } from "@/components/modal/modal.types";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

export function ModalLogin() {
  return (
    <CustomModal backdrop={Backdrop.Opaque} title="hola">
      <Input
        autoFocus
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
      />
      <div className="flex justify-between px-1 py-2">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
        >
          Remember me
        </Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
    </CustomModal>
  );
}
