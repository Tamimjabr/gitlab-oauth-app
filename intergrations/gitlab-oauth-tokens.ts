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

const url = "https://gitlab.lnu.se/oauth/token"

export const getGitlabOauthTokens = async (code: string): Promise<Tokens> => {
  try {
    const params = {
      code,
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
      client_secret: process.env.APPLICATION_SECRET as string,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
    }

    const response = await axios.post<GitLabTokensInfo>(url, qs.stringify(params))

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

export const refreshGitlabAccessToken = async (tokens: Tokens): Promise<Tokens> => {
  try {
    const params = {
      refresh_token: tokens.refreshToken,
      grant_type: 'refresh_token',
      client_id: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
      client_secret: process.env.APPLICATION_SECRET as string,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
    }

    const response = await axios.post<GitLabTokensInfo>(url, qs.stringify(params))
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