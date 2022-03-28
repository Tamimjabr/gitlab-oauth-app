import axios from "axios"
import qs from "qs"

interface GitLabTokensInfo {
  access_token: string
  expires_in: number
  refresh_token: string
  created_at: number
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  createdAt: number
}

const GITLAB_AUTH_URL = "https://gitlab.lnu.se/oauth/token"
const GITLAB_OAUTH_PARAMS = {
  client_id: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
  client_secret: process.env.APPLICATION_SECRET as string,
  redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
}

/**
 * Request user tokens from Gitlab.
 *
 */
export const getGitlabOauthTokens = async (code: string): Promise<Tokens> => {
  try {
    const params = {
      code,
      grant_type: 'authorization_code',
      ...GITLAB_OAUTH_PARAMS,
    }

    const response = await axios.post<GitLabTokensInfo>(GITLAB_AUTH_URL, qs.stringify(params))

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      createdAt: response.data.created_at,
      expiresIn: response.data.expires_in
    }
  } catch (error: any) {
    throw new Error("Failed to get GitLab OAuth tokens")
  }
}

/**
 * Refresh user tokens from Gitlab.
 *
 */
export const refreshGitlabTokens = async (tokens: Tokens): Promise<Tokens> => {
  try {
    const params = {
      refresh_token: tokens.refreshToken,
      grant_type: 'refresh_token',
      ...GITLAB_OAUTH_PARAMS
    }

    const response = await axios.post<GitLabTokensInfo>(GITLAB_AUTH_URL, qs.stringify(params))
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      createdAt: response.data.created_at,
      expiresIn: response.data.expires_in
    }
  } catch (error: any) {
    throw new Error("Failed to refresh GitLab OAuth tokens")
  }
}