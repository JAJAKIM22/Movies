import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Results from '@/components/Results'
import requests from '@/utils/requests'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '@/atoms/modalAtom'
import Mode from '@/components/Mode'



export default function Home({results}) {
  const showModal = useRecoilValue(modalState)
  
  return (
    <div>
      <Head>
        <title>Movies</title>
      </Head>
      
      {/* Header */}
     <Header />
      {/* Navbar */}
     <Nav/>
      {/* Results */}
    <Results results={results} />
    {showModal && <Mode />}
   
      </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre
   
  const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}`
  ).then(res => res.json())
 return{
  props:{
    results: request.results
  }
 }
}