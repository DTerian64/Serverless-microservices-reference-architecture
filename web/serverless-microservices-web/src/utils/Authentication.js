import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

// refer to https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md

const ACCESS_TOKEN = 'rideshare_access_token';
const USER_DETAILS = 'rideshare_user_details';
let _accountId = null;
let _loginRequest;
let _tokenRequest;

export class Authentication {
  constructor() {
    // Check if authentication is disabled
    if (!window.authEnabled) {
      console.log('Authentication is disabled via window.authEnabled flag');
      this._authDisabled = true;
      return;
    }

    this._authDisabled = false;

    // The window values below should by set by public/js/settings.js
    const msalConfig = {
      auth: {
        clientId: window.authClientId,
        authority: window.authAuthority,
        knownAuthorities: [window.knownAuthority],
        redirectUri: window.redirectUri
      },
      cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
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
                    return;	
                case LogLevel.Info:	
                    console.info(message);	
                    return;	
                case LogLevel.Verbose:	
                    console.debug(message);	
                    return;	
                case LogLevel.Warning:	
                    console.warn(message);	
                    return;
            }
          }
        }
      } 
    };

    this._publicClientApplication = new PublicClientApplication(msalConfig);

    _loginRequest = {
      scopes: window.loginScopes
    };

    _tokenRequest = {
      scopes: window.apiScopes,
      forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
    }
  }

  getUser() {
    if (this._authDisabled) {
      // Return a mock user when auth is disabled
      return {
        homeAccountId: 'mock-user-id',
        username: 'mock@example.com',
        name: 'Mock User'
      };
    }

    // if _accountId is not null, then the user is already logged in
    let user = null;
    if (_accountId) {
      user = this._publicClientApplication.getAccountByHomeId(_accountId);
    }
    return user;
  }

  getError() {
    return this._error;
  }

  getAccessToken() {
    if (this._authDisabled) {
      // Return a mock token when auth is disabled
      return Promise.resolve('mock-access-token');
    }

    _tokenRequest.account = this._publicClientApplication.getAccountByHomeId(_accountId);
    return this._publicClientApplication.acquireTokenSilent(_tokenRequest).then(
      response => {
        return response.accessToken;
      },
      error => {
        return this._publicClientApplication.acquireTokenPopup(_tokenRequest).then(
          response => {
            return response.accessToken;
          },
          err => {
            console.error(err);
          }
        );
      }
    );
  }

  login() {
    if (this._authDisabled) {
      console.log('Login bypassed - authentication disabled');
      // Return a mock successful login
      return Promise.resolve({
        homeAccountId: 'mock-user-id',
        username: 'mock@example.com',
        name: 'Mock User'
      });
    }

    return this._publicClientApplication.loginPopup(_loginRequest)
    .then(
      response => {
        _accountId = response.account.homeAccountId;
        return response.account;
      },
      () => {
        return null;
      }
    );
  }

  logout() {
    if (this._authDisabled) {
      console.log('Logout bypassed - authentication disabled');
      window.location.replace('/');
      return Promise.resolve();
    }

    const logoutRequest = {
      account: _accountId,
      redirectUri: window.logoutURI
    };
    this._publicClientApplication.logoutPopup(logoutRequest).then(() => {
      window.location.replace('/');
    });
  }

  isAuthenticated() {
    if (this._authDisabled) {
      // Always return true when auth is disabled
      return true;
    }
    return !!this.getUser();
  }

  getAccessTokenOrLoginWithPopup() {
    if (this._authDisabled) {
      // Return mock token when auth is disabled
      return Promise.resolve('mock-access-token');
    }

    _tokenRequest.account = this._publicClientApplication.getAccountByHomeId(_accountId);
    return this._publicClientApplication
      .acquireTokenSilent(_tokenRequest)
      .catch(err => {
        return this.login();
        });
  }
}

export function requireAuth(to, from, next) {
  // Check if authentication is globally disabled
  if (!window.authEnabled) {
    console.log('Authentication check bypassed - auth disabled');
    next(); // Continue without auth check
    return;
  }

  const auth = new Authentication();
  if (!auth.isAuthenticated()) {
    next({
      path: '/no-auth',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getToken() {
  if (!window.authEnabled) {
    return 'mock-access-token';
  }
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getUserDetails() {
  if (!window.authEnabled) {
    return {
      id: 'mock-user-id',
      username: 'mock@example.com',
      name: 'Mock User'
    };
  }
  return JSON.parse(localStorage.getItem(USER_DETAILS));
}