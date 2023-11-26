import BusinessWrapper from "@/components/business/businessWrapper";
import ParametersWrapper from "@/components/parameters/parametersWrapper";
import TableCustom from "@/components/table/table";
import TableUsers from "@/components/users/TableUsers";
import UsersTable from "@/components/users/usersTable";

export default function Page() {
  return (
    <BusinessWrapper>
      <ParametersWrapper>
        <main className="grid grid-cols-12 py-10 bg-manugly-grey-light">
          <div className="flex col-start-3 col-end-11">
            <TableUsers></TableUsers>
          </div>
        </main>
      </ParametersWrapper>
    </BusinessWrapper>
  );
}
