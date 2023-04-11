import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'

const Home = () => {
  
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/media/recommended", {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      })
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        setContent("Error: " + err);
      });
  }, []);

  return (
    <div className="container">
        <div className="row">
          {content.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
  )
}

export default Home