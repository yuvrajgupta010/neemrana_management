import { useContext } from "react";

import Link from "next/link";
import classes from "./Header.module.css";

import Image from "next/image";
import AuthCtx from "@/ctxStore/authCtx";
import { useRouter } from "next/navigation";

const Header = (props) => {
  const { isLoggedIn, isAdmin, makeUserLogOut, name, employeeId } =
    useContext(AuthCtx);

  const router = useRouter();

  const goToMenuHandler = () => {
    router.push("/");
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image_container}>
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="Logo of hotel"
              className={classes.img}
              fill
              priority={true}
            />
          </Link>
        </div>
      </header>
      <div className={classes.user_nav}>
        {isLoggedIn ? (
          <>
            <div className={classes.user}>
              <p className={classes.user_p}>
                <span className={classes.user_icon}>
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
                <span className={classes.user_text}>
                  {name}{" "}
                  {isAdmin ? "( Admin )" : `(Employee Id: ${employeeId})`}
                </span>
              </p>
            </div>
            <nav className={classes.nav}>
              <ul className={classes.list}>
                <li onClick={goToMenuHandler} className={classes.li}>
                  Menu
                </li>
                <li onClick={makeUserLogOut} className={classes.li}>
                  Logout
                </li>
              </ul>
            </nav>
          </>
        ) : (
          ""
        )}
        {!isLoggedIn ? (
          <>
            <div className={classes.user}>
              <p className={`${classes.user_p} ${classes.block_center}`}>
                Welcome, Have a nice day!
              </p>
            </div>
            <nav className={classes.nav}>
              <ul className={classes.list}>
                <li className={classes.li}>
                  <Link href={"/"}>Menu</Link>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Header;
