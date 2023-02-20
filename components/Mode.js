import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modalAtom'
import { VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa'
import { signIn, signOut, useSession } from "next-auth/react"

function Mode() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [result, setResult] = useRecoilState(movieState)
    // const [movie, setMovie] = useS(null);
    const [trailer, setTrailer] = useState("")
    const [genres, setGenres] = useState([]);
    const [muted, setMuted] = useState(true)
    const { data: session, status } = useSession()

    
   
    useEffect(() => {
      if (!result) return;
    
      async function fetchMovie() {
        const data = await fetch(
          `https://api.themoviedb.org/3/${
            result.media_type === 'tv' ? 'tv' : 'movie'
          }/${result.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        ).then((response) => response.json());
        // console.log(data);
        if (data.videos) {
          const index = data.videos.results.findIndex(
            (element) => element.type === 'Trailer'
            
          );
          setTrailer(data.videos.results[index]?.key);
        }
        if (data.genres) {
          setGenres(data.genres);
        }
       
      }
    
    
      fetchMovie();
    }, [result]);
    // console.log(genres)
    // console.log(trailer)
    const handleClose = () => {
        setShowModal(false)
        setResult(null)
        
      }
  if (status === "authenticated") { 
  return (
    <Modal    open={showModal}
    onClose={handleClose}
    className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
    <>
    <button onClick={handleClose} className='modalButton absolute right-1 top-1 z-50 h-9 w-9 border-none bg-[#181818]'>
      <XIcon className='h-6 w-6'/>
    </button>
    <div className="relative pt-[56.25%]">
    <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
          <div>
          {/* <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button> */}
              </div>
              <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
    </div>
    <div className="flex  space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
      <div className="space-y-6 text-lg">
        <div className="flex items-center space-x-2 text-sm">
          <p className="font-semibold text-green-400">
            {result?.vote_average * 10}% Match
          </p>
          <p className="font-light">
            {result?.release_date || result?.first_air_date}
          </p>
          <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
            HD
          </div>
        </div>
        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
          <p className="w-5/6 hidden md:flex">{result?.overview}</p>
          <div className="flex flex-col space-y-3 text-sm">
            <div>
              <span className="text-[gray]">Genres:</span>{' '}
              {genres.map((genre) => genre.name).join(', ')}
            </div>
            <div>
              <span className="text-[gray] hidden md:flex">Original language: {result?.original_language}</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    </Modal>
  )
}
}

export default Mode