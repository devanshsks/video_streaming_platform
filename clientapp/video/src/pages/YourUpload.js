import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'

const YourUpload = () => {
    const [media, setMedia] = useState([])

    useEffect(() => {
        try{
            axios.get("/media/userAll", {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                }
            }).then((res) => {
                setMedia(res.data)
            })
        
        }catch(err){
            console.log(err)
        }
    }, []);

  return (
    <div className="container">
        <div className="row">
          {media.map((item) => {
            item.username = JSON.parse(localStorage.getItem("user")).name
            return <Card key={item.id} item={item} />
            })}
        </div>
      </div>
  )
}

export default YourUpload