import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function usePortal(id: string) {
  const elementRef = useRef(null);

  useEffect(() => {
    const existingPortalRootElement = document.querySelector(`#${id}`);
    const portalRootElement = existingPortalRootElement || createPortalRootElement(id);

    if (!existingPortalRootElement) {
      addPortalRootElement(portalRootElement);
    }

    portalRootElement.appendChild(elementRef.current);

    return () => {
      portalRootElement.remove();
      elementRef.current.remove();
    };
  }, [id]);

  const createPortalRootElement = (id: string) => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", id);

    return portalRoot;
  };

  const addPortalRootElement = (portalRoot: Element) => {
    document.body.insertBefore(portalRoot, null);
  };

  const createElement = () => {
    if (!elementRef.current) {
      elementRef.current = document.createElement("div");
    }

    return elementRef.current;
  };

  return createElement();
}

usePortal.propTypes = {
  id: PropTypes.string.isRequired,
};
