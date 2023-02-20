import Thumbnail from "./Thumbnail"
import FlipMove from "react-flip-move"
import { modalState, movieState } from '@/atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react';

function Results({results}) {
  // const [movie, setMovie] = useState(true);
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  // const [showModal, setShowModal] = useRecoilState(modalState)
  console.log()
  return (
    
   
    <FlipMove className="px-5 my-10 sm:grid  md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center ">
        {results.map(result => (
           <Thumbnail key={result.id} result={result}  />
        ))}
    </FlipMove>
   
  )
}

export default Results