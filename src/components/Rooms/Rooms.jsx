"use client";

import { useContext, useEffect, useState } from "react";
import NewRoom from "./NewRoom/NewRoom";
import RoomList from "./RoomList/RoomList";
import classes from "./Rooms.module.css";
import AuthCtx from "@/ctxStore/authCtx";
import StatusCtx from "@/ctxStore/statusCtx";
import Status from "../UI/Status/Status";

const Rooms = (props) => {
  const { haveError, haveStatus, message, setStatusMessage } =
    useContext(StatusCtx);
  const { isLoggedIn, token } = useContext(AuthCtx);
  const [allRoom, setAllRoom] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [formAutoFilledData, setFormAutoFilledData] = useState({});
  const [formMode, setFormMode] = useState("newRoom");

  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://neemrana-hotel-api.onrender.com/management/room", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((rooms) => {
          setAllRoom(rooms.allRoom);
        });
    }
  }, [token, isLoggedIn]);

  const openFormOfRoom = (autoData = {}) => {
    setFormIsOpen(true);
    setFormAutoFilledData(autoData);
  };

  const closeFormOfRoom = () => {
    setFormIsOpen(false);
    setFormMode("newRoom");
  };

  const onSubmitForm = (userData, type = "newRoom") => {
    if (type === "edit") {
      const roomData = allRoom.filter((room, i) => {
        if (userData.roomNo === room.roomNo) {
          room.arrIdx = i;
          return true;
        }
      });
      const front = allRoom.slice(0, roomData[0].arrIdx);
      const back = allRoom.slice(roomData[0].arrIdx + 1);
      fetch("https://neemrana-hotel-api.onrender.com/management/room", {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something wents wrong. Try again !");
          }
          return res.json();
        })
        .then((data) => {
          setStatusMessage(data.message, false);
          setAllRoom([...front, userData, ...back]);
          setFormIsOpen(false);
        })
        .catch((err) => {
          setFormIsOpen(false);
          setStatusMessage(err.message, true);
        });
    } else if (type === "newRoom") {
      fetch("https://neemrana-hotel-api.onrender.com/management/room", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Room no. already exists !");
          }
          return res.json();
        })
        .then((data) => {
          setStatusMessage(data.message);
          setFormIsOpen(false);
          setAllRoom((prev) => {
            return [userData, ...prev];
          });
        })
        .catch((err) => {
          setFormIsOpen(false);
          setStatusMessage(err.message, true);
        });
    }
    setFormMode("newRoom");
  };

  const deleteRoomHandler = (roomNo) => {
    console.log(roomNo);
    const isConfirm = confirm(
      "Are you really want to delete room " + roomNo + "?"
    );
    if (isConfirm) {
      fetch("https://neemrana-hotel-api.onrender.com/management/room", {
        method: "DELETE",
        body: JSON.stringify({ roomNo }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const filterData = allRoom.filter((room) => {
            return room.roomNo !== roomNo;
          });
          setStatusMessage(data.message);
          setAllRoom(filterData);
        });
    }
  };

  const editRoomHandler = (roomNo) => {
    const roomData = allRoom.filter((room) => {
      return room.roomNo === roomNo;
    });
    setFormAutoFilledData(roomData[0]);
    setFormIsOpen(true);
    setFormMode("edit");
  };

  return (
    <section className={classes.section}>
      <h2 className={classes.secondary_heading}>
        <span>Rooms</span>
      </h2>
      {haveStatus ? <Status error={haveError} message={message} /> : ""}

      {!formIsOpen ? (
        <button onClick={openFormOfRoom} className={classes.button}>
          + Add New Room
        </button>
      ) : (
        <NewRoom
          defaultValues={formAutoFilledData}
          formMode={formMode}
          onSubmitForm={onSubmitForm}
          cancelFormInputs={closeFormOfRoom}
        />
      )}
      {allRoom.length !== 0 ? (
        <RoomList
          listOfRoom={allRoom}
          editRoomHandler={editRoomHandler}
          deleteRoomHandler={deleteRoomHandler}
        />
      ) : (
        <h2>No room present in hotel !</h2>
      )}
    </section>
  );
};

export default Rooms;
