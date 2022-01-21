export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      NODE_ENV: string;
      REACT_APP_API_ENDPOINT: string;
      REACT_APP_MAINNET: string;
      REACT_APP_TESTNET: string;
      REACT_APP_MAIN_SITE: string;
    };
  }
}
