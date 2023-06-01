"use client";

import { useContext, useState } from "react";
import classes from "./CheckIn.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import StatusCtx from "@/ctxStore/statusCtx";
import Status from "../UI/Status/Status";
import CheckInForm from "../UI/Form/CheckInForm/CheckInForm";
import AuthCtx from "@/ctxStore/authCtx";

const CheckIn = (props) => {
  const { token, employeeId } = useContext(AuthCtx);
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
    removeStatusMessageInstant();
    setIsFilterOn(false);
  };

  const submitBookingId = () => {
    if (!(bookingId.trim().length > 0)) {
      setStatusMessage("Please enter booking id !", true);

      return;
    }
    if (Number(bookingId) === NaN) {
      setStatusMessage("Booking ID only contain number", true);
      return;
    }
    setIsLoading(true);
    fetch("http://localhost:4000/management/get-booking-data", {
      method: "POST",
      body: JSON.stringify({ bookingId: Number(bookingId) }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
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
  };

  const resetBookingId = () => {
    removeStatusMessageInstant();
    setBookingId("");
    setIsFilterOn(false);
    setIsLoading(false);
    setBookingData(null);
  };

  const confirmCheckInHandler = (data) => {
    setIsLoading(true);
    const preparedData = {
      adultIds: data.adultIds,
      paymentMode: data.paymentMode,
      bookingId: bookingData.bookingId,
      customerEmail: bookingData.customerEmail,
      price: bookingData.price,
    };
    fetch("http://localhost:4000/management/check-in", {
      method: "POST",
      body: JSON.stringify(preparedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Already Check-In !");
        }
        return res.json();
      })
      .then((data) => {
        setStatusMessage(data.message, false);
        setIsFilterOn(false);
        setBookingId("");
        setBookingData(null);
      })
      .catch((err) => {
        setStatusMessage(err.message, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.section}>
      <h2 className={classes.secondary_heading}>
        <span>Check-In</span>
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
      {isLoading ? <LoadingSpinner /> : ""}
      {isFilterOn ? (
        <CheckInForm
          confirmCheckInHandler={confirmCheckInHandler}
          bookingData={bookingData}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default CheckIn;
