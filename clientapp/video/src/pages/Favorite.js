import React from 'react'
import { useState, useEffect } from 'react';
import Card from "../components/Card";
import axios from 'axios';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const getFavorites = async () => {
          try {
            const { data } = await axios.post(
              "/user/favorites/",
              {},
              {
                headers: {
                  token:
                    "Bearer " +
                    JSON.parse(localStorage.getItem("user")).accessToken,
                },
              }
            );
            setFavorites(data);
            // console.log(data);
          } catch (err) {
            console.log(err);
          }
        };
        getFavorites();
      }, []);
  return (
    <div className="favorites container">
        <div className="row">
          {React.Children.toArray(
          favorites.map((favorite) => (
            <Card key={favorite.id} item={favorite} />
          )))}
          {
        // if no search results
         favorites.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
            <h2
              style={{
                color: "white",
                background: "rgba(0,0,0,0.5)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              No results found
            </h2>
          </div>
        )
      }
        </div>
      </div>
  )
}

export default Favorite