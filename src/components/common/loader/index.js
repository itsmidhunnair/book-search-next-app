import React from "react";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-gray-800 dark:border-white"></div>
    </div>
  );
};

export default Loader;
