import { useState } from "react";

export default function useMenus({ defaultMenus, onMenuChange }) {
  const [menuState, setState] = useState(defaultMenus);

  function handleMenuClick(e) {
    const selectMenu = e.target.dataset.menu;

    if (menuState !== selectMenu) {
      setState(selectMenu);
      onMenuChange && onMenuChange(selectMenu);
    }
  }

  function checkActive(state, menuState) {
    return state === menuState;
  }

  return { menuState, handleMenuClick, checkActive };
}
