import React, { useState } from "react";

export default () => {
  const [isLoading, setLoading] = useState(false);

  return {
    setLoading,
    isLoading
  };
};
