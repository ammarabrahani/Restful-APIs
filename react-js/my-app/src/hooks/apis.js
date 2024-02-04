import axios from "axios";
import { useEffect, useState } from "react";

const GetAPI = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }, []);

  return {
    loading,
    data,
  };
};

export default GetAPI;
