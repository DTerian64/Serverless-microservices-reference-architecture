import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

class Authentication {
  constructor() {
    if (!import.meta.env.VITE_AUTH_ENABLED || import.meta.env.VITE_AUTH_ENABLED === "false") {
      console.log('Authentication is disabled');
      this._authDisabled = true;
      return;
    }
    console.log('Starting Authentication constructor');
    this._authDisabled = false;

    this._publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        knownAuthorities: [import.meta.env.VITE_KNOWN_AUTHORITY],
        redirectUri: import.meta.env.VITE_REDIRECT_URI
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (!containsPii) console.log(message);
          },
          logLevel: LogLevel.Info,
        },
      }
    });

    // 🔴 THIS IS CRITICAL
    this._initializePromise = this._publicClientApplication.initialize();
  }

  async login() {
    if (this._authDisabled) return;

    await this._initializePromise;  // ✅ Wait for MSAL to initialize
    const loginRequest = {
      scopes: import.meta.env.VITE_LOGIN_SCOPES.split(','),
    };

    const response = await this._publicClientApplication.loginPopup(loginRequest);
   // const response = await this._publicClientApplication.loginRedirect(loginRequest);
    
    this._accountId = response.account.homeAccountId;
    return response.account;
  }
  async logout() {
    if (this._authDisabled) return;

    await this._initializePromise;  // ✅ Ensure MSAL is initialized
    const logoutRequest = {
      account: this._publicClientApplication.getAllAccounts()[0],
      postLogoutRedirectUri: import.meta.env.VITE_REDIRECT_URI,
    };

    await this._publicClientApplication.logout(logoutRequest);
  }
  async isAuthenticated() {
  if (this._authDisabled) return false;

  await this._initializePromise;

  const accounts = this._publicClientApplication.getAllAccounts();
  return accounts && accounts.length > 0;
  }

  async getAccessToken() {
    if (this._authDisabled) return 'mock-token';

    await this._initializePromise;  // ✅ Ensure MSAL is initialized

    const account = this._publicClientApplication.getAllAccounts()[0];
    if (!account) return null;

    const tokenRequest = {
      account,
      scopes: import.meta.env.VITE_API_SCOPES.split(','),
    };

    try {
      const response = await this._publicClientApplication.acquireTokenSilent(tokenRequest);
      return response.accessToken;
    } catch {
      const response = await this._publicClientApplication.acquireTokenPopup(tokenRequest);
      return response.accessToken;
    }
  }

  

  // repeat await this._initializePromise in any other method that calls MSAL APIs
}

// NEW: Create a singleton instance
const auth = new Authentication();
export { auth };
