import classes from "./CheckOutForm.module.css";

const CheckInForm = (props) => {
  const { confirmCheckOutHandler, bookingData, cancelCheckOutHandler } = props;
  const {
    bookingId,
    checkIn,
    checkOut,
    customerEmail,
    dateOfBooking,
    noOfAdult,
    noOfChild,
    roomNo,
    customerName,
  } = bookingData;
  const formSubmitHandler = (event) => {
    event.preventDefault();
    confirmCheckOutHandler();
  };

  const resetformHandler = (event) => {
    event.preventDefault();
    cancelCheckOutHandler();
  };
  return (
    <form
      className={classes.form}
      onSubmit={formSubmitHandler}
      onReset={resetformHandler}
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
          <span>Email :</span>
          <span>{customerEmail}</span>
        </p>
      </div>
      <div className={classes.buttons_form}>
        <button type="submit">Confirm CheckOut</button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  );
};

export default CheckInForm;
