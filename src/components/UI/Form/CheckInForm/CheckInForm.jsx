import { useState } from "react";
import classes from "./CheckInForm.module.css";

const initalPaymentMode = "UPI";

const CheckInForm = (props) => {
  const { confirmCheckInHandler, bookingData } = props;
  const {
    bookingId,
    checkIn,
    checkOut,
    customerEmail,
    dateOfBooking,
    noOfAdult,
    noOfChild,
    price,
    roomNo,
    customerName,
  } = bookingData;
  const [guestsData, setGuestsData] = useState([
    {
      id: Math.random().toString(),
      guestName: "",
      govIdNo: "",
      govIdType: "Aadhaar",
    },
  ]);
  const [paymentMode, setPaymentMode] = useState(initalPaymentMode);

  const guestsInputHandler = (index, fieldType, event) => {
    const clonGuestData = [...guestsData];
    const selectedGuest = clonGuestData[index];
    if (fieldType === "guestName") {
      selectedGuest.guestName = event.target.value;
    } else if (fieldType === "govIdNo") {
      selectedGuest.govIdNo = event.target.value;
    } else if (fieldType === "govIdType") {
      selectedGuest.govIdType = event.target.value;
    }
    setGuestsData(clonGuestData);
  };

  const addGuestHandler = () => {
    setGuestsData((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        guestName: "",
        govIdNo: "",
        govIdType: "Aadhaar",
      },
    ]);
  };

  const deleteGuestHandler = () => {
    if (guestsData.length === 1) {
      return;
    }
    const colonGuestsData = [...guestsData];
    colonGuestsData.pop();
    setGuestsData(colonGuestsData);
  };

  const paymentModeHandler = (event) => {
    setPaymentMode(event.target.value);
  };

  const formResetHandler = (event) => {
    event.preventDefault();
    setGuestsData([
      {
        id: Math.random().toString(),
        guestName: "",
        govIdNo: "",
        govIdType: "Aadhaar",
      },
    ]);
    setPaymentMode("UPI");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formatedGuestsData = guestsData.map((guest) => {
      return guest.govIdNo.trim();
    });
    formResetHandler(event);
    confirmCheckInHandler({ adultIds: formatedGuestsData, paymentMode });
  };

  return (
    <form
      className={classes.form}
      onSubmit={formSubmitHandler}
      onReset={formResetHandler}
    >
      <div className={classes.form_details}>
        <h3 className={classes.tertiary_heading}>Customer Details</h3>
        <p className={classes.p}>
          <span>Booking Id :</span>
          <span>{bookingId}</span>
        </p>
        <p className={classes.p}>
          <span>Room No :</span>
          <span>{roomNo}</span>
        </p>
        <p className={classes.p}>
          <span>Date of Booking :</span>
          <span>{dateOfBooking}</span>
        </p>
        <p className={classes.p}>
          <span>Name :</span>
          <span>{customerName}</span>
        </p>
        <p className={classes.p}>
          <span>Check-in :</span>
          <span>{checkIn}</span>
        </p>
        <p className={classes.p}>
          <span>Check-out :</span>
          <span>{checkOut}</span>
        </p>
        <p className={classes.p}>
          <span>No. of Adult :</span>
          <span>{noOfAdult}</span>
        </p>
        <p className={classes.p}>
          <span>No. of Child :</span>
          <span>{noOfChild}</span>
        </p>
        <p className={classes.p}>
          <span>Customer email :</span>
          <span>{customerEmail}</span>
        </p>
      </div>
      <div className={classes.form_guests}>
        <h3 className={classes.tertiary_heading}>Guests Details</h3>
        {guestsData.map((guestData, index) => {
          return (
            <div key={guestData.id} className={classes.input_form}>
              <p className={classes.p}>Guest {index + 1} Details</p>
              <div className={classes.input_field}>
                <label className={classes.label} htmlFor="guest1Name">
                  Name :
                </label>
                <input
                  className={classes.input}
                  type="text"
                  value={guestData.guestName}
                  onChange={(e) =>
                    guestsInputHandler.bind(null, index, "guestName")(e)
                  }
                  required
                  name="guest1Name"
                  id="guest1Name"
                />
              </div>
              <div className={classes.input_field}>
                <label className={classes.label} htmlFor="guest1Id">
                  ID No. :
                </label>
                <input
                  className={classes.input}
                  type="text"
                  value={guestData.govIdNo}
                  onChange={(e) =>
                    guestsInputHandler.bind(null, index, "govIdNo")(e)
                  }
                  required
                  minLength={6}
                  name="guest1Id"
                  id="guest1Id"
                />
              </div>
              <div className={classes.input_field}>
                <label className={classes.label} htmlFor="guest1IdType">
                  ID Type :
                </label>
                <select
                  className={classes.input}
                  value={guestData.govIdType}
                  onChange={(e) =>
                    guestsInputHandler.bind(null, index, "govIdType")(e)
                  }
                  name="guest1IdType"
                  id="guest1IdType"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Driving Licence">Driving Licence</option>
                  <option value="PAN Card">PAN Card</option>
                </select>
              </div>
            </div>
          );
        })}

        <div className={classes.buttons}>
          <button type="button" onClick={addGuestHandler}>
            + Add Guest
          </button>
          <button
            type="button"
            disabled={guestsData.length === 1 ? true : false}
            onClick={deleteGuestHandler}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={classes.form_paymentMode}>
        <h3 className={classes.tertiary_heading}>Payment</h3>
        <p className={classes.p}>
          <span>Payable Amount :</span>
          <span>&#x20B9; {price}</span>
        </p>
        <div className={classes.input_field}>
          <label className={classes.label} htmlFor="paymentMode">
            Payment Mode :
          </label>
          <select
            className={classes.input}
            onChange={paymentModeHandler}
            value={paymentMode}
            name="paymentMode"
            id="paymentMode"
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>
      </div>
      <div className={classes.buttons_form}>
        <button type="submit">Confirm CheckIn</button>
        <button type="reset" disabled={guestsData.length === 1 ? true : false}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default CheckInForm;
