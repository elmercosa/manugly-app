"use client";

import { Button, Link, Tooltip } from "@nextui-org/react";
import { IconEdit, IconSettings } from "@tabler/icons-react";
import { use, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useBusiness } from "@/app/contexts/business/context";
import { useParameters } from "@/app/contexts/parameter/context";
import { Parameters } from "@/factory/types/parameters";
import entityService from "@/services/entityService";
import { paramService } from "@/services/paramService";
import { userService } from "@/services/userService";

import EntityTable from "../table/entityTable";
import AddUserForm from "./add";

export default function Users() {
  const [enableQuery, setEnableQuery] = useState(false);
  const [filters, setFilters] = useState([] as any);
  const [paramValues, setParamValues] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const BusinessContext = useBusiness();
  const columns = userService.columns;
  const queryKey = "users";
  const queryFn = entityService("users").getAll;
  const queryParams = BusinessContext.state.business.id;
  const actions: any[] = [];

  const parameters = Parameters.getInstance().getParameters();
  const ParamsContext = useParameters();

  const tableHeader = () => {
    return (
      <>
        <Button
          href="/admin/users/config"
          as={Link}
          className="font-semibold text-white bg-manugly rounded-xl "
          startContent={<IconSettings size={20} className="font-semibold" />}
        >
          Configurar usuarios
        </Button>
        <AddUserForm />
      </>
    );
  };
  const filterFunction = (entities: any, filterValue: string) => {
    return entities.filter((user: any) => {
      const userParameters = user.userParameters;
      const paramsFilter = ParamsContext.state.parameters;

      // Buscamos si se ha filtrado por algun parametro
      const paramsFilterAux = paramsFilter.filter((param: any) => {
        return param.data.value != undefined && param.data.value != "";
      });

      if (paramsFilterAux.length) {
        let paramsValid = 0;
        userParameters.forEach((param: any) => {
          let parameter = ParamsContext.state.parameters.find((p: any) => {
            return p.data.id == param.parameter.id;
          });
          if (
            parameter &&
            parameter.data.value != undefined &&
            parameter.data.value != "" &&
            param.value.toLowerCase().includes(parameter.data.value) &&
            parameter.data.value.length <= param.value.toLowerCase().length
          ) {
            paramsValid++;
          }
        });
        if (
          paramsValid &&
          (user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
            user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
            user?.email?.toLowerCase().includes(filterValue.toLowerCase()))
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          user?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.surname?.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.email?.toLowerCase().includes(filterValue.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
  };

  const GetParameters = useQuery({
    queryKey: "get-parameters",
    queryFn: () => paramService.getAllParams(BusinessContext.state.business.id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  });

  const setFilterValue = (value: any, index: number) => {
    // paramValues[index].value = value;
    // setParamValues([...paramValues]);
  };

  useEffect(() => {
    if (ParamsContext.state.parameters) {
      setNeedsUpdate(true);
      setTimeout(() => {
        setNeedsUpdate(false);
      }, 50);
    }
  }, [ParamsContext]);

  useEffect(() => {
    if (GetParameters.data && !GetParameters.isLoading) {
      let parametersAux = [] as any;
      GetParameters.data.map((param: any, index: number) => {
        let parameter = {
          param: parameters[param.type],
          data: param,
          isValid: true,
          isValidated: true,
          isSaving: false,
          hasError: false,
          index: index,
        };

        let column = {
          key: `parameter.${param.title}`,
          label: param.title,
        };
        let actions = columns.pop() ?? {
          key: "actions",
          label: "Acciones",
        };

        columns.push(column);
        columns.push(actions);

        parametersAux.push(parameter);
      });
      setParamValues(parametersAux);
      ParamsContext.dispatch({ type: "set", data: parametersAux });
      let filtros = () => {
        return (
          <div className="flex gap-2">
            {GetParameters.data.map((param: any, index: number) => {
              let parameter = parameters[param.type];
              return (
                <div key={param.id}>
                  <parameter.filter
                    index={index}
                    title={param.title}
                    type={param.type}
                    setFilterValue={setFilterValue}
                  />
                </div>
              );
            })}
          </div>
        );
      };
      setFilters(filtros);
    }
  }, [GetParameters.data, GetParameters.isLoading]);

  useEffect(() => {
    if (BusinessContext.state.business.id) {
      setEnableQuery(true);
    }
  }, [BusinessContext.state.business.id]);

  return (
    <>
      <EntityTable
        columns={columns}
        queryKey={queryKey}
        queryFn={queryFn}
        queryParams={queryParams}
        actions={actions}
        filterFunction={filterFunction}
        tableHeader={tableHeader}
        entityName="usuario"
        entityNamePlural="usuarios"
        endpoint="users"
        filters={filters}
        showFilters={true}
        needsUpdate={needsUpdate}
      />
    </>
  );
}
