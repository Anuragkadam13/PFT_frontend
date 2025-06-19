import React from "react";

const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50">
      <div class="h-16 w-16 animate-spin rounded-full border-b-4 border-black"></div>
    </div>
  );
};

export default Loader;
