"use client";

import { useContext, useState } from "react";
import classes from "./CheckOut.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import StatusCtx from "@/ctxStore/statusCtx";
import Status from "../UI/Status/Status";
import CheckOutForm from "../UI/Form/CheckOutForm/CheckOutForm";
import AuthCtx from "@/ctxStore/authCtx";

const CheckOut = (props) => {
  const { token } = useContext(AuthCtx);
  const {
    haveStatus,
    setStatusMessage,
    message,
    haveError,
    removeStatusMessageInstant,
  } = useContext(StatusCtx);
  const [bookingId, setBookingId] = useState("");
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const bookingIdChangeHandler = (event) => {
    setBookingId(event.target.value);
    setBookingData(null);
    setIsFilterOn(false);
    removeStatusMessageInstant();
  };

  const resetBookingId = () => {
    removeStatusMessageInstant();
    setBookingId("");
    setIsFilterOn(false);
    setBookingData(null);

    setIsLoading(false);
  };

  const submitBookingId = () => {
    if (bookingId.trim().length > 0) {
      setIsLoading(true);
      fetch(
        "https://neemrana-hotel-api.onrender.com/management/get-booking-data",
        {
          method: "POST",
          body: JSON.stringify({ bookingId: Number(bookingId) }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("booking id doesn't exist!");
          }
          return res.json();
        })
        .then((data) => {
          setBookingData(data.bookingData);
          setIsFilterOn(true);
        })
        .catch((err) => {
          console.error(err.message);
          setStatusMessage(err.message, true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setStatusMessage("Please enter valid Id !", true);
    }
  };

  const confirmCheckOutHandler = () => {
    setStatusMessage("Check-out successfully!", false);
    setBookingData(null);
    setIsFilterOn(false);
    setBookingId("");
  };

  const cancelCheckOutHandler = () => {
    setBookingData(null);
    setIsFilterOn(false);
    setBookingId("");
  };

  return (
    <section className={classes.section}>
      <h2 className={classes.secondary_heading}>
        <span>Check-Out</span>
      </h2>
      <div className={classes.card}>
        <label className={classes.label} htmlFor="bookingId">
          Booking Id
        </label>
        <input
          className={classes.input}
          value={bookingId}
          onChange={bookingIdChangeHandler}
          type="number"
          name="bookingId"
          id="bookingId"
        />

        <div className={classes.buttons}>
          <button type="submit" onClick={submitBookingId}>
            Search
          </button>
          <button type="reset" onClick={resetBookingId}>
            Reset
          </button>
        </div>
      </div>
      {haveStatus ? <Status message={message} error={haveError} /> : ""}
      {isFilterOn ? (
        <CheckOutForm
          bookingData={bookingData}
          confirmCheckOutHandler={confirmCheckOutHandler}
          cancelCheckOutHandler={cancelCheckOutHandler}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default CheckOut;
