import { useEffect, useState } from "react";

function useFetch(apiCall) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCall()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [apiCall]);

  return { data, loading };
}

export default useFetch;