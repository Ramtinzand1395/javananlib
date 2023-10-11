import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import CreateBookImg from './CreateBookImg'
import CreateBookDetailsils from './CreateBookDetails'

const CreateBook = () => {
  const [BookImg, setBookImg] = useState("")
  return (
    <div className="flex">
        <Sidebar />
        <div className="mx-10 mt-5">
          <CreateBookImg setBookImg={setBookImg}/>
          <CreateBookDetailsils BookImg={BookImg} />
        </div>
      </div>
  )
}

export default CreateBook