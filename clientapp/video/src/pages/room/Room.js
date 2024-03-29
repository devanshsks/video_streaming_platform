import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { RoomHost } from "../../components/roomhost/RoomHost";
import { RoomUser } from "../../components/roomuser/RoomUser";
import SocketContext from "../../socketContext/SocketContext";
import RoomContext from "../../roomContext/roomContext";
import { HostProvider } from "../../roomContext/hostSocket";

const Room = () => {
    const user = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const { roomId } = useParams();
    const { roomState, setRoomState } = useContext(RoomContext);
  
    const [isHost, setIsHost] = useState(false);
  
    const JoinRoom = async (roomId) => {
      const userId = user.user._id;
  
      socket.emit("joinRoom", { roomId, userId }, (response) => {
        if (response.error) {
          window.location.href = "/room";
        } else {
          setRoomState({
            roomId: response.room.roomId,
            roomName: response.room.name,
            isHost: response.room.isHost,
            isJoined: true,
            admin: response.room.admin,
          });
          setIsHost(response.room.isHost);
        }
      });
    };
  
    useEffect(() => {
      JoinRoom(roomId);
    }, []);
    return isHost ? 
    <HostProvider socket={socket} roomId={roomId}>
    <RoomHost roomId={roomId} />
    </HostProvider> : <RoomUser roomId={roomId} />;
  };
  
  export default Room;
