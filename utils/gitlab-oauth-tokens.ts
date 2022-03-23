import axios from "axios"
import qs from "qs";

interface GitLabTokensInfo {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
}

export const getGitlabOauthTokens = async (code: string) => {
  try {
    const url = "https://gitlab.lnu.se/oauth/token"

    const params = {
      client_id: process.env.NEXT_PUBLIC_APPLICATION_ID as string,
      client_secret: process.env.APPLICATION_SECRET as string,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
    }

    const response = await axios.post<GitLabTokensInfo>(url, qs.stringify(params))

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Failed to get GitLab OAuth tokens")
  }

}