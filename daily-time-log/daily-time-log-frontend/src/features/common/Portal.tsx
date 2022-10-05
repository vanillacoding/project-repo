import { useEffect } from "react";
import { createPortal } from "react-dom";

import usePortal from "../../utils/hooks/usePortal";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function Portal({ id, children }: Props) {
  const target = usePortal(id);

  useEffect(() => {
    const body = document.querySelector("body");
    const scrollPosition = window.pageYOffset;

    body.style.overflow = "hidden";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.removeProperty("overflow");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");

      window.scrollTo(0, scrollPosition);
    };
  }, []);

  return createPortal(children, target);
}
