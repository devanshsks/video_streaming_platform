import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import PlayListCard from "../../components/PlayListCard";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
  
    const handleCreate = () => {
      // swal form for one input
      Swal.fire({
        title: "Create a new playlist",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Create",
        showLoaderOnConfirm: true,
        preConfirm: async (playlistName) => {
          // create playlist
          try {
            const newplaylist = await axios.post(
              "/playlists/add",
              { playlistName },
              {
                headers: {
                  token:
                    "Bearer " +
                    JSON.parse(localStorage.getItem("user")).accessToken,
                },
              }
            );
            return newplaylist;
          } catch (err) {
            console.log(err);
            return err;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // add new playlist to state
          window.location.href = "/playlists";
        }
      });
    };
  
    useEffect(() => {
      const getPlaylists = async () => {
        try {
          const res = await axios.get("/playlists/all", {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setPlaylists(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getPlaylists();
    }, []);
  
    return (
        <div>
        <div className="w-100 d-flex justify-content-end">
          <div className="btn btn-primary" onClick={handleCreate}>
            Create Playlist
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap">
            {React.Children.toArray(
            playlists.map((playlist) => (
              <PlayListCard item={playlist} />
            )))}
          </div>
        </div>
        </div>
    );
  };
  
  export default Playlists;
