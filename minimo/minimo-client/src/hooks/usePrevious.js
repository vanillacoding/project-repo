import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const prevChildrenRef = useRef();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
}

export default usePrevious;

// NOTE: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
