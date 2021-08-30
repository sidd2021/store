import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return [
    { email, password },
    function (e) {
      if (e.target.name === "email") {
        setEmail(e.target.value);
      } else if (e.target.name === "password") {
        setPassword(e.target.value);
      }
    },
  ];
};
