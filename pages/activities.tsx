import Error from 'next/error'
import React from 'react'
import { getGitlabUserEvents, GitlabUserEvent, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import { withIronSessionSsr } from "iron-session/next"
import { GetServerSidePropsResult } from 'next'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'
import ActivitiesTable from '../components/ActivitiesTable'
import { getGitlabOauthUrl } from '../utils/gitlab-oauth-url'
import Header from '../components/Header'
import ProfileTabs from '../components/ProfileTabs'
import { Typography } from '@mui/material'


const Activities = ({ userEvents, userInfo, error }: any) => {

  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }
  return (
    <>
      <Header userInfo={userInfo} />
      <Typography variant='h5' sx={{ textAlign: 'center', m: '1rem auto', width: "50%" }}>Your last 101 activities</Typography>
      <ProfileTabs />
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

    if (!req.session.tokens || !req.session.userInfo) {
      return {
        redirect: {
          destination: getGitlabOauthUrl(),
          permanent: false,
        },
      }
    }

    try {
      const userEvents: GitlabUserEvent[] = await getGitlabUserEvents(req.session.tokens.accessToken)
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