import {
  AuthRequestPromptOptions,
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session'

const GITHUB_MOBILE_CLIENT_ID = '41291d0a093167caaad1'
const APP_SCHEME = 'nlwspacetime'

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_MOBILE_CLIENT_ID}`,
}

export function useGihubOAuth(): [
  AuthSessionResult,
  (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>,
] {
  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: GITHUB_MOBILE_CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: APP_SCHEME,
      }),
    },
    discovery,
  )

  return [response, signInWithGithub]
}
