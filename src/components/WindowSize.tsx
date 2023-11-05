import React, { useState } from "react";

export const useUniversalState = (window.innerWidth) => {
  const [state, setState] = useState(window.innerWidth);


  return [state, setUniversalState];
};
