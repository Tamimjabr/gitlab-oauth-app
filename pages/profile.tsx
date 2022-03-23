import React from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { getGitlabOauthTokens } from '../utils/gitlab-oauth-tokens'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'
import { getGitlabUserInfo, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import Error from 'next/error'
import { GetServerSidePropsResult } from 'next'
import ProfileCard from '../components/ProfileCard'
import { Box } from '@mui/material'


const Profile = ({ userInfo, error }: any) => {
  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }

  return (
    <Box sx={{ m: 'auto', width: '100%', minHeight: '100vh', display: 'flex' }}><ProfileCard userInfo={userInfo} /></Box>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<GetServerSidePropsResult<{
    userInfo: GitlabUserInfo | null,
    error: { code: number, message: string } | null
  }>> {
    try {
      const code = query.code
      const tokens = await getGitlabOauthTokens(code)
      req.session.tokens = tokens
      await req.session.save()

      const userInfo: GitlabUserInfo = await getGitlabUserInfo(req.session.tokens.accessToken)

      return {
        props: {
          userInfo,
          error: null
        }
      }
    } catch (error: any) {
      return {
        props: {
          userInfo: null,
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