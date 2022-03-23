import React from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { getGitlabOauthTokens } from '../utils/gitlab-oauth-tokens'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'
import { getGitlabUserInfo, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import Error from 'next/error'


const Profile = ({ userInfo, error }: { userInfo: GitlabUserInfo, error: { code: number, message: string } }) => {
  if (error.code) {
    return <Error statusCode={error.code} title={error.message} />
  }

  return (
    <div>{userInfo.name}</div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, res, query }: any) {
    try {
      const code = query.code
      const tokens = await getGitlabOauthTokens(code)
      req.session.tokens = tokens
      await req.session.save()

      const userInfo: GitlabUserInfo = await getGitlabUserInfo(req.session.tokens.access_token)

      return {
        props: {
          userInfo,
        }
      }
    } catch (error: any) {
      return {
        props: {
          error: {
            code: 401,
            message: error.message
          }
        }
      }
    }

  },
  IRON_SESSION_CONFIG
)

export default Profile