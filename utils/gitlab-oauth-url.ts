import qs from 'qs'

/**
 * Construct a URL to the GitLab OAuth endpoint using  application ID, redirect URL
 * and state that works as csrf token.
 *
 */
export const getGitlabOauthUrl = (state: string): string => {
  const gitlabOauthUrl = 'https://gitlab.lnu.se/oauth/authorize'
  const params = {
    client_id: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
    redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
    response_type: 'code',
    scope: [
      'read_api',
      'read_user'
    ].join(' '),
    state
  }

  return `${gitlabOauthUrl}?${qs.stringify(params)}`
}