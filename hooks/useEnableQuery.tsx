import { useEffect, useState } from "react";

export default function useEnableQuery(value: any) {
  const [enableQuery, setEnableQuery] = useState(false);
  useEffect(() => {
    if (value !== "") {
      setEnableQuery(true);
    }
  }, [value]);

  return enableQuery;
}
