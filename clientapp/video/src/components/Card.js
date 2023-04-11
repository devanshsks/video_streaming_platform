import { useContext} from "react";
import {AuthContext} from "../authContext/AuthContext";

const Card = ({ key, item }) => {
    const TrimVar = ({ prop, length }) => {
        if (prop.length > length) {
          return prop.substring(0, length) + "...";
        } else {
          return prop;
        }
      };
      
      
      const date_to_days = (date) => {
          const dateObj = new Date(date);
          const today = new Date();
          const diffTime = Math.abs(today - dateObj); // seconds
      
          switch (true) {
              case diffTime < 60000:
                  return "just now";
              case diffTime < 3600000:
                  return Math.floor(diffTime / 60000) + " minutes ago";
              case diffTime < 86400000:
                  return Math.floor(diffTime / 3600000) + " hours ago";
              case diffTime < 604800000:
                  return Math.floor(diffTime / 86400000) + " days ago";
              case diffTime < 2419200000:
                  return Math.floor(diffTime / 604800000) + " weeks ago";
              case diffTime < 29030400000:
                  return Math.floor(diffTime / 2419200000) + " months ago";
              default:
                  return Math.floor(diffTime / 29030400000) + " years ago";
          }
      
      };
      
    const handleCLick = () => {
    //   window.location.href = `/watch/${item._id}`;
    alert("not implemented yet! Sorry");
    };
  
    const user = useContext(AuthContext);
  
    const loadImg = () => {
      return item.imgUrl;
    };
  
    return (
      <div className="card px-0" id={"card_" + key} style={{ width: "300px" }}>
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={handleCLick}
        >
          <img
            src={loadImg()}
            className="card-img-top border"
            alt={item.title}
            style={{ width: "100%", height: "180px", display: "block" }}
          />
          {/* background opaque 70% */}
          <i
            className={
              item.type === "audio"
                ? "fa fa-headphones p-2"
                : "fa fa-play-circle p-2"
            }
            style={{
              position: "absolute",
              top: "1%",
              left: "1%",
              fontSize: "20px",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: "10%",
            }}
          ></i>
        </div>
        <div className="card-body p-0 pt-2">
          <div className="d-flex flex-row">
            <div className="mx-2 d-flex justify-content-center mt-1">
              <img
                src={
                  "https://ui-avatars.com/api/?name=" +
                  (item.username !== undefined ? item.username : user.user.name)
                }
                alt=""
                className="img rounded"
                style={{ width: "25px", height: "25px" }}
              ></img>
            </div>
            <div className="px-2">
              <span
                className="py-2"
                onClick={handleCLick}
                style={{ cursor: "pointer" }}
              >
                {TrimVar({ prop: item.title, length: 50 })}
              </span>{" "}
              <br />
              <span className="py-3" style={{ opacity: 0.8, fontSize: "13px" }}>
                {item.username !== undefined
                  ? TrimVar({ prop: item.username, length: 20 })
                  : user.user.name}
              </span>{" "}
              <br />
              <span className="py-3" style={{ opacity: 0.8, fontSize: "13px" }}>
                {item.streams} streams • {date_to_days(item.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default Card