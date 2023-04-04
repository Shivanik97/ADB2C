import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: 'd47f77e4-ba30-44fb-bd27-15e7911edd8a',
    authority:
      "https://ariqtlearning.b2clogin.com/ariqtlearning.onmicrosoft.com/B2C_1_signInandSignUp",
    knownAuthorities: ["ariqtlearning.b2clogin.com"],
    redirectUri: "http://localhost:8080",
    postLogoutRedirectUri: "http://localhost:8080",
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;

          case LogLevel.Info:
            console.info(message);
            break;

          case LogLevel.Verbose:
            console.debug(message);
            break;

          case LogLevel.Warning:
            console.warn(message);
            break;

          default:
            break;
        }
      },
      piiLoggingEnabled: false,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
