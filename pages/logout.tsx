import React from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'

const Logout = () => {
  return (
    <div>Logout...</div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any) {
    await req.session.destroy()

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  },
  IRON_SESSION_CONFIG
)


export default Logout