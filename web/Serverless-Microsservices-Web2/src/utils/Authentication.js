import { LogLevel, PublicClientApplication } from '@azure/msal-browser'

const ACCESS_TOKEN = 'rideshare_access_token'
const USER_DETAILS = 'rideshare_user_details'

let _accountId = null
let _loginRequest
let _tokenRequest

export class Authentication {
  constructor() {
    // Check if authentication is disabled via .env flag
    const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true'
    if (!authEnabled) {
      console.log('Authentication is disabled via VITE_AUTH_ENABLED flag')
      this._authDisabled = true
      return
    }

    this._authDisabled = false

    const msalConfig = {
      auth: {
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        knownAuthorities: [import.meta.env.VITE_KNOWN_AUTHORITY],
        redirectUri: import.meta.env.VITE_REDIRECT_URI
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) return
            switch (level) {
              case LogLevel.Error:
                console.error(message)
                break
              case LogLevel.Info:
                console.info(message)
                break
              case LogLevel.Verbose:
                console.debug(message)
                break
              case LogLevel.Warning:
                console.warn(message)
                break
            }
          }
        }
      }
    }

    this._publicClientApplication = new PublicClientApplication(msalConfig)

    const loginScopes = import.meta.env.VITE_LOGIN_SCOPES.split(',')
    const apiScopes = import.meta.env.VITE_API_SCOPES.split(',')

    _loginRequest = { scopes: loginScopes }
    _tokenRequest = {
      scopes: apiScopes,
      forceRefresh: true
    }
  }

  getUser() {
    if (this._authDisabled) {
      return {
        homeAccountId: 'mock-user-id',
        username: 'mock@example.com',
        name: 'Mock User'
      }
    }

    return _accountId
      ? this._publicClientApplication.getAccountByHomeId(_accountId)
      : null
  }

  getError() {
    return this._error
  }

  getAccessToken() {
    if (this._authDisabled) {
      return Promise.resolve('mock-access-token')
    }

    _tokenRequest.account = this._publicClientApplication.getAccountByHomeId(_accountId)

    return this._publicClientApplication.acquireTokenSilent(_tokenRequest).then(
      response => response.accessToken,
      () => this._publicClientApplication.acquireTokenPopup(_tokenRequest).then(
        response => response.accessToken,
        err => console.error(err)
      )
    )
  }

  login() {
    if (this._authDisabled) {
      console.log('Login bypassed - authentication disabled')
      return Promise.resolve({
        homeAccountId: 'mock-user-id',
        username: 'mock@example.com',
        name: 'Mock User'
      })
    }

    return this._publicClientApplication.loginPopup(_loginRequest).then(
      response => {
        _accountId = response.account.homeAccountId
        return response.account
      },
      () => null
    )
  }

  logout() {
    if (this._authDisabled) {
      console.log('Logout bypassed - authentication disabled')
      window.location.replace('/')
      return Promise.resolve()
    }

    const logoutRequest = {
      account: _accountId,
      redirectUri: import.meta.env.VITE_REDIRECT_URI
    }

    return this._publicClientApplication.logoutPopup(logoutRequest).then(() => {
      window.location.replace('/')
    })
  }

  isAuthenticated() {
    return this._authDisabled || !!this.getUser()
  }

  getAccessTokenOrLoginWithPopup() {
    if (this._authDisabled) {
      return Promise.resolve('mock-access-token')
    }

    _tokenRequest.account = this._publicClientApplication.getAccountByHomeId(_accountId)

    return this._publicClientApplication
      .acquireTokenSilent(_tokenRequest)
      .catch(() => this.login())
  }
}

// Vue router guard
export function requireAuth(to, from, next) {
  const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true'

  if (!authEnabled) {
    console.log('Authentication check bypassed - auth disabled')
    next()
    return
  }

  const auth = new Authentication()
  if (!auth.isAuthenticated()) {
    next({
      path: '/no-auth',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function getToken() {
  const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true'
  return authEnabled
    ? localStorage.getItem(ACCESS_TOKEN)
    : 'mock-access-token'
}

export function getUserDetails() {
  const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true'
  return authEnabled
    ? JSON.parse(localStorage.getItem(USER_DETAILS))
    : {
        id: 'mock-user-id',
        username: 'mock@example.com',
        name: 'Mock User'
      }
}
