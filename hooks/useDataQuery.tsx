import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useDataQuery(value: any, query: any) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (query.data && !query.isLoading) {
      setData(query.data);
    }
    if (query.isError) {
      toast.error("Ha ocurrido un error al obtener los datos");
    }
  }, [query.isLoading, query.data]);

  return data ?? [];
}
