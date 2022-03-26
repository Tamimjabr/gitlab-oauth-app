import qs from 'qs'

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