import { useEffect, useState } from "react";

import classes from "./NewRoom.module.css";

const NewRoom = (props) => {
  const {
    defaultValues = {},
    onSubmitForm,
    cancelFormInputs,
    formMode,
  } = props;

  const [roomNo, setRoomNo] = useState(defaultValues.roomNo ?? "");
  const [roomType, setRoomType] = useState(defaultValues.roomType ?? "Super");
  const [size, setSize] = useState(defaultValues.size ?? "");
  const [price, setPrice] = useState(defaultValues.price ?? "");
  const [maxAdult, setMaxAdult] = useState(defaultValues.maxAdult ?? "");
  const [maxChild, setMaxChild] = useState(defaultValues.maxChild ?? "");
  const [maxGuests, setMaxGuests] = useState(defaultValues.maxGuests ?? "");
  const [facilities, setFacilities] = useState(defaultValues.facilities ?? []);
  const [newFacility, setNewFacility] = useState(
    defaultValues.newFacility ?? ""
  );
  const [haveDinner, setHaveDinner] = useState(false);
  const [haveLaunch, setHaveLaunch] = useState(false);
  const [haveBreakfast, setHaveBreakfast] = useState(false);

  useEffect(() => {
    defaultValues.included?.forEach((ele) => {
      if ("Breakfast" === ele) {
        setHaveBreakfast(true);
      }
      if ("Dinner" === ele) {
        setHaveDinner(true);
      }
      if ("Launch" === ele) {
        setHaveLaunch(true);
      }
    });
  }, []);

  const inputHandler = (setState) => (event) => {
    setState(event.target.value);
  };

  const checkboxHandler = (setState) => (event) => {
    setState(event.target.checked);
  };

  const removeFacilityHandler = (index) => {
    const front = facilities.slice(0, index);
    const back = facilities.slice(index + 1);
    setFacilities([...front, ...back]);
  };

  const addNewFacilityHandler = () => {
    if (newFacility.trim().length === 0) {
      return;
    }
    const newArray = [...facilities];
    newArray.push(newFacility);
    setFacilities(newArray);
    setNewFacility("");
  };

  const resetFormHandler = (event) => {
    event.preventDefault();
    setRoomNo("");
    setRoomType("Super");
    setSize(0);
    setMaxAdult(0);
    setMaxChild(0);
    setMaxGuests(0);
    setFacilities([]);
    setNewFacility("");
    setHaveDinner(false);
    setHaveBreakfast(false);
    setHaveLaunch(false);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const included = [];
    if (haveDinner) {
      included.push("Dinner");
    }
    if (haveLaunch) {
      included.push("Launch");
    }
    if (haveBreakfast) {
      included.push("Breakfast");
    }
    onSubmitForm(
      {
        roomNo: roomNo,
        facilities: facilities,
        maxAdult: maxAdult,
        maxChild: maxChild,
        maxGuests: maxGuests,
        price: price,
        size: size,
        category: roomType,
        included: included,
      },
      formMode
    );
  };

  return (
    <form
      className={classes.form}
      onSubmit={formSubmitHandler}
      onReset={resetFormHandler}
    >
      <h3 className={classes.form_tertiary_heading}>
        <span>{formMode === "newRoom" ? "Add New Room" : "Edit Room"}</span>
      </h3>
      <label htmlFor="roomNo" className={classes.label}>
        RoomId
      </label>
      <input
        className={classes.input}
        value={roomNo}
        onChange={inputHandler(setRoomNo)}
        type="text"
        name="roomNo"
        id="roomNo"
        required
        disabled={formMode === "newRoom" ? false : true}
      />
      <label className={classes.label} htmlFor="roomType">
        Room Type
      </label>
      <select
        value={roomType}
        onChange={inputHandler(setRoomType)}
        className={classes.input}
        name="roomType"
        id="roomType"
      >
        <option value="Super">Super</option>
        <option value="Bussiness">Bussiness</option>
        <option value="Execuitive">Execuitive</option>
      </select>
      <label className={classes.label} htmlFor="size">
        Size
      </label>
      <input
        value={size}
        onChange={inputHandler(setSize)}
        className={classes.input}
        type="number"
        name="size"
        id="size"
        required
      />
      <label className={classes.label} htmlFor="price">
        Price
      </label>
      <input
        value={price}
        onChange={inputHandler(setPrice)}
        className={classes.input}
        type="number"
        name="price"
        id="price"
        required
      />
      <label className={classes.label} htmlFor="maxAdult">
        Max Adults
      </label>
      <input
        className={classes.input}
        value={maxAdult}
        onChange={inputHandler(setMaxAdult)}
        type="number"
        name="maxAdult"
        id="maxAdult"
      />
      <label className={classes.label} htmlFor="maxChild">
        Max Childs
      </label>
      <input
        className={classes.input}
        value={maxChild}
        onChange={inputHandler(setMaxChild)}
        type="number"
        name="maxChild"
        id="maxChild"
      />
      <label className={classes.label} htmlFor="maxGuests">
        Max Guests
      </label>
      <input
        className={classes.input}
        value={maxGuests}
        onChange={inputHandler(setMaxGuests)}
        type="number"
        name="maxGuests"
        id="maxGuests"
      />
      <div className={classes.facility}>
        <h3 className={classes.tertiary_heading}>Facility :</h3>
        <div>
          <ul className={classes.lists}>
            {facilities.length === 0 ? (
              <p className={classes.userNotification}>No facility added!</p>
            ) : (
              facilities.map((facility, i) => {
                return (
                  <li key={Math.random().toString()} className={classes.list}>
                    <span>{facility}</span>
                    <span onClick={removeFacilityHandler.bind(null, i)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={classes.icon}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className={classes.input_box}>
          <input
            className={classes.facility_input}
            type="text"
            name="new facility"
            value={newFacility}
            onChange={inputHandler(setNewFacility)}
          />
          <button
            onClick={addNewFacilityHandler}
            className={classes.facility_button}
            type="button"
          >
            + Add Facility
          </button>
        </div>
      </div>
      <div className={classes.include}>
        <h3 className={classes.tertiary_heading}>Includes :</h3>
        <div className={classes.include_grid}>
          <input
            className={classes.input}
            type="checkbox"
            onChange={checkboxHandler(setHaveBreakfast)}
            checked={haveBreakfast}
            name="breakfast"
            id="breakfast"
          />
          <label className={classes.label} htmlFor="breakfast">
            Breakfast
          </label>
          <input
            className={classes.input}
            onChange={checkboxHandler(setHaveLaunch)}
            checked={haveLaunch}
            type="checkbox"
            name="launch"
            id="launch"
          />
          <label className={classes.label} htmlFor="launch">
            Launch
          </label>
          <input
            className={classes.input}
            onChange={checkboxHandler(setHaveDinner)}
            checked={haveDinner}
            type="checkbox"
            name="dinner"
            id="dinner"
          />
          <label className={classes.label} htmlFor="dinner">
            Dinner
          </label>
        </div>
      </div>
      <div className={classes.buttons}>
        <button type="submit">Confirm</button>
        <button type="button" onClick={cancelFormInputs}>
          Cancel
        </button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default NewRoom;
