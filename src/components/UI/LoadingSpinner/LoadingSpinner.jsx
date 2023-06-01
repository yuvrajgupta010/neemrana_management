"use client";

import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = (props) => {
  return (
    <RotatingLines
      strokeColor="#493a3a"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  );
};

export default LoadingSpinner;
