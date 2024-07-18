import '@testing-library/jest-dom';
//import '@testing-library/jest-dom/extend-expect';

// jest.setup.js
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };  