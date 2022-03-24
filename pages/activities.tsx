import Error from 'next/error'
import React from 'react'
import { getGitlabUserEvents, GitlabUserEvent, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import { withIronSessionSsr } from "iron-session/next"
import { GetServerSidePropsResult } from 'next'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'
import ActivitiesTable from '../components/ActivitiesTable'
import { getGitlabOauthUrl } from '../utils/gitlab-oauth-url'
import ProfileTabs from '../components/ProfileTabs'
import { Typography } from '@mui/material'
import { isExpiredAccessToken, updateTokens } from '../utils/tokens-expiration-checker'


const Activities = ({ userEvents, userInfo, error }: any) => {

  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }
  return (
    <>
      <ProfileTabs />
      <Typography variant='h5' sx={{ textAlign: 'center', m: '1rem auto', width: "50%" }}>Your last 101 activities</Typography>
      <div><ActivitiesTable rows={userEvents} /></div>
    </>

  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<GetServerSidePropsResult<{
    userInfo: GitlabUserInfo | null,
    userEvents: GitlabUserEvent[] | null,
    error: { code: number, message: string } | null
  }>> {
    try {
      if (req.session?.tokens && isExpiredAccessToken(req.session.tokens)) {
        await updateTokens(req)
      }

      if (!req.session.tokens || !req.session.userInfo) {
        return {
          redirect: {
            destination: getGitlabOauthUrl(),
            permanent: false,
          },
        }
      }

      const userEvents: GitlabUserEvent[] = await getGitlabUserEvents(req.session.tokens.accessToken, 100, 1)
      const oneMoreUserEvent: GitlabUserEvent[] = await getGitlabUserEvents(req.session.tokens.accessToken, 1, 101)
      userEvents.push(...oneMoreUserEvent)
      const userInfo: GitlabUserInfo = req.session.userInfo
      return {
        props: {
          userInfo,
          userEvents,
          error: null
        }
      }
    } catch (error: any) {
      return {
        props: {
          userInfo: null,
          userEvents: null,
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


export default Activities