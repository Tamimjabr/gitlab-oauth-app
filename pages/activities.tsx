import Error from 'next/error'
import React, { useEffect, useState } from 'react'
import { getGitlabUserEvents, GitlabUserEvent, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import ActivitiesTable from '../components/ActivitiesTable'
import { getGitlabOauthUrl } from '../utils/gitlab-oauth-url'
import ProfileTabs from '../components/ProfileTabs'
import { Typography } from '@mui/material'
import { isExpiredAccessToken, updateTokens } from '../utils/tokens-expiration-checker'
import Head from 'next/head'
import { getCsrfTokenAndSaveOnSession } from '../utils/csrf-token-handler'
import { withSessionSsr } from '../config/iron-session-config'
import Loader from '../components/Loader'


type ActivitiesProps = {
  userInfo: GitlabUserInfo | null,
  userEvents: GitlabUserEvent[] | null,
  error: { code: number, message: string } | null
}

const Activities = ({ userEvents, error }: ActivitiesProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userEvents) {
      setLoading(false)
    }

  }, [userEvents])

  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Head>
        <title>Activities</title>
        <meta name="activities" content="User activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileTabs />
      <Typography variant='h5' sx={{ textAlign: 'center', m: '1rem auto', width: "50%", textDecoration: 'underline' }}>Your Last 101 Activities</Typography>
      <div >
        {userEvents && <ActivitiesTable rows={userEvents} />}
      </div>
    </>

  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActivitiesProps>> {
    try {
      if (req.session?.tokens && isExpiredAccessToken(req.session.tokens)) {
        await updateTokens(req)
      }

      const state = await getCsrfTokenAndSaveOnSession(req)

      if (!req.session.tokens || !req.session.userInfo) {
        return {
          redirect: {
            destination: getGitlabOauthUrl(state),
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
  }
)


export default Activities

