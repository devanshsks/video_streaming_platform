import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'

const Home = () => {
  // console.log(user);
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
        // console.log(res.data);
      })
      .catch((err) => {
        setContent("Error: " + err);
      });
  }, []);

  return (
    <div className="container">
        <div className="row">
          {React.Children.toArray(
          content.map((item) => (
            <Card item={item} key={item.id} />
          )))}
        </div>
      </div>
  )
}

export default Home