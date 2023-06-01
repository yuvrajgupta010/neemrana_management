"use client";

import { useContext } from "react";

import classes from "./Home.module.css";

import AdminIcon from "./AbminIcon";
import EmployeeIcon from "./EmployeeIcon";
import Link from "next/link";
import AuthCtx from "@/ctxStore/authCtx";

const Home = (props) => {
  const { isLoggedIn, isAdmin } = useContext(AuthCtx);
  if (!isLoggedIn) {
    return (
      <section className={classes.section_unauth}>
        <Link href={"/employee-login"}>
          <div className={classes.card_unauth}>
            <div className={classes.icon_block}>
              <EmployeeIcon className={classes.icon} />
            </div>
            <p className={classes.p_unauth}>Employee Login</p>
          </div>
        </Link>
        <Link href={"/admin-login"}>
          <div className={classes.card_unauth}>
            <div className={classes.icon_block}>
              <AdminIcon className={classes.icon} />
            </div>
            <p className={classes.p_unauth}>Admin Login</p>
          </div>
        </Link>
      </section>
    );
  }

  if (isLoggedIn) {
    return (
      <section className={classes.section_auth}>
        <div className={classes.cards_auth}>
          <Link href={"/check-in"}>
            <div className={classes.card_auth}>
              <p className={classes.p_auth}>Check</p>
              <p className={classes.p_auth}>In</p>
            </div>
          </Link>
          <Link href={"/check-out"}>
            <div className={classes.card_auth}>
              <p className={classes.p_auth}>Check</p>
              <p className={classes.p_auth}>Out</p>
            </div>
          </Link>
          {isAdmin ? (
            <>
              <Link href={"/customer-query"}>
                <div className={classes.card_auth}>
                  <p className={classes.p_auth}>Customer</p>
                  <p className={classes.p_auth}>Query</p>
                </div>
              </Link>
              <Link href={"/rooms"}>
                <div className={classes.card_auth}>
                  <p className={classes.p_auth}>Add, Delete, Edit</p>
                  <p className={classes.p_auth}>Rooms</p>
                </div>
              </Link>
              <Link href={"/create-user"}>
                <div className={classes.card_auth}>
                  <p className={classes.p_auth}>Create</p>
                  <p className={classes.p_auth}>Employee & Admin</p>
                </div>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
};

export default Home;
