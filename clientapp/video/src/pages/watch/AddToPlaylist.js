import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const AddToPlaylist = ({ mediaId }) => {
  const [playlists, setPlaylists] = useState([]);
  const selectRef = useRef();
  useEffect(() => {
    axios
      .post(
        "/playlists/list",
        {
          mediaId: mediaId,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      )
      .then((res) => {
        setPlaylists(res.data);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = () => {
    const playlistId = selectRef.current.value;
    axios
      .post(
        "/playlists/addto",
        {
          playlistId: playlistId,
          mediaId: mediaId,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Added to playlist",
          icon: "success",
          confirmButtonText: "Ok",
        })
        .then((result) => {
            window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div
      className="modal fade"
      id="addToPlaylistModal"
      tabIndex="-1"
      aria-labelledby="addToPlaylistModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addToPlaylistModalLabel">
              Add to Playlist
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <select
              className="form-select"
              aria-label="Default select example"
              ref={selectRef}
            >
              <option selected>Select Playlist</option>
              {playlists.map((playlist) => (
                <option value={playlist._id}>{playlist.playlistName}</option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSelect}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;