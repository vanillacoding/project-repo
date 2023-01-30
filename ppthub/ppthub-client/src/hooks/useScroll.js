import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { throttle } from "lodash";

const scrollContext = createContext(null);
const scrollDispatchContext = createContext(null);

export function ScrollProvider({ children }) {
  const [scrollRatio, setScrollRatio] = useState(50);

  const setScroll = useCallback(
    throttle((ratio) => {
      setScrollRatio(ratio);
    }, 20),
    [setScrollRatio],
  );

  const scrollValue = useMemo(() => scrollRatio, [scrollRatio]);

  return (
    <scrollContext.Provider value={scrollValue}>
      <scrollDispatchContext.Provider value={setScroll}>
        {children}
      </scrollDispatchContext.Provider>
    </scrollContext.Provider>
  );
}

export function useScrollValue() {
  return useContext(scrollContext);
}

export function useSetScroll() {
  const setScroll = useContext(scrollDispatchContext);
  return (ratio) => setScroll(ratio);
}
