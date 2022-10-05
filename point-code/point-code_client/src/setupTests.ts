import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

if (window.document) {
  window.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore
    getBoundingClientRect: () => {},
    // @ts-ignore
    getClientRects: () => [],
    // @ts-ignore
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}
