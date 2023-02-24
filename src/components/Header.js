import { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
//icons
import { BiRightArrow } from "react-icons/bi";
import { ClassContext } from "../Context/ClassContext";
import { retrieveClasses } from "../Firebase";

const Header = ({ classNames, showListItemsFn, signedIn }) => {
  const [showListItems, setShowListItems] = useState(false);
  const [allClasses, setAllClasses] = useState();
  const { currentClass, setCurrentClass } = useContext(ClassContext);

  const showList = (e) => {
    if (!signedIn) return;

    if (!showListItems) {
      setShowListItems(true);
      showListItemsFn(true);
    } else {
      setShowListItems(false);
      showListItemsFn(false);
    }

    switch (e.target.innerHTML) {
      case "11 A1":
        retrieveClasses().then((res) => {
          console.log(res);
          setCurrentClass({
            title: "11A1",
            pointsTotal: res[0].totalScore,
            pointsToday: 0,
          });
        });
        //will need to read points from db

        break;
      case "11 E1":
        setCurrentClass({ title: "11E1", pointsTotal: 0, pointsToday: 0 });
        break;
      case "11 E2":
        setCurrentClass({ title: "11E2", pointsTotal: 0, pointsToday: 0 });
        break;
      case "11 E3":
        setCurrentClass({ title: "11E3", pointsTotal: 0, pointsToday: 0 });
        break;
      case "11 E4":
        setCurrentClass({ title: "11E4", pointsTotal: 0, pointsToday: 0 });
        break;
      case "11 E5":
        setCurrentClass({ title: "11E5", pointsTotal: 0, pointsToday: 0 });
        break;
      case "11 E6":
        setCurrentClass({ title: "11E6", pointsTotal: 0, pointsToday: 0 });
        break;
    }
  };

  return (
    <div className={classes.header}>
      <p>{currentClass.title}</p>
      <span className={classes.total}>{currentClass.pointsToday}</span>
      <span className={classes.selectClassBtn} onClick={showList}>
        <BiRightArrow
          className={
            !showListItems
              ? `${classes.arrowBtn}`
              : `${classes.arrowBtn} ${classes.selectedArrow}`
          }
        />
        {classNames.map((el) => {
          return (
            <li
              className={
                showListItems
                  ? `${classes.classSymbol}`
                  : `${classes.classSymbol} ${classes.hidden}`
              }
              key={el.className.split("^")[1]}
            >
              {el.className.split("^")[1]}
            </li>
          );
        })}
      </span>
    </div>
  );
};

export default Header;
