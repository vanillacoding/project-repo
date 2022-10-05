import { useState } from 'react';

export default function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return {
    isSidebarOpen,
    toggleSidebar,
  };
}
