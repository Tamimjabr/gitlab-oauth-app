import axios from "axios"

export interface GitlabUserInfo {
  id: number
  name: string
  username: string
  email: string
  avatar_url: string
  last_activity_on: string
}

export interface GitlabUserEvent {
  action_name: string
  created_at: string
  target_title: string
  target_type: string
  auther: {
    username: string,
    avatar_url: string
  }
  push_data: {
    ref_type: string,
    commit_title: string
  }

}

export const getGitlabUserInfo = async (accessToken: string) => {
  try {
    const url = "https://gitlab.lnu.se/api/v4/user"

    const response = await axios.get<GitlabUserInfo>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data

  } catch (error: any) {

    throw new Error("Failed to get GitLab user info")
  }
}

export const getGitlabUserEvents = async (accessToken: string) => {
  try {
    const url = "https://gitlab.lnu.se/api/v4/events"

    const response = await axios.get<GitlabUserEvent[]>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data

  } catch (error: any) {
    throw new Error("Failed to get GitLab user events")
  }
}