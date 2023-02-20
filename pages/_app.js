import '@/styles/globals.css'

import {  SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'

// export default function App({ Component, pageProps }) {
//   return (
//   <AuthProvider sesssion={pageProps.sesssion}>
//   <Component {...pageProps} />
//   </AuthProvider>
//   )
// }

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
    </RecoilRoot>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}