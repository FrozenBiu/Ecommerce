import { useEffect, useState } from "react";

const useDebounce = (searchInput: string) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const a = setTimeout(() => {
      setMessage(searchInput);
      console.log(message);
    }, 300);

    return () => {
      clearTimeout(a);
    };
  }, [searchInput, message]);

  return message;
};

export default useDebounce;
