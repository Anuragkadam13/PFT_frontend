import React, { useState } from "react";
import LoadingContext from "./LoadingContext";

const LoaderState = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);
  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoaderState;
