import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components";
import { setAuthenticated } from "../../../libs/localStorage";

export default () => {
  const history = useHistory();
  return (
    <Button
      label="Login"
      onClick={() => {
        setAuthenticated(true);
        history.push("/dashboard");
      }}
    />
  );
};
