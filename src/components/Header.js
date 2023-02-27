import { useContext, useState } from "react"; //hooks
import classes from "./Header.module.css"; //styling
import { BiRightArrow } from "react-icons/bi"; //icons
import { classGroup } from "../Config/Config";
import { ClassContext } from "../Context/ClassContext";
import { retrieveClass } from "../Firebase";

const Header = ({ showListItemsFn, signedIn }) => {
  const [showListItems, setShowListItems] = useState(false);
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

    classGroup.forEach((el) => {
      if (el === e.target.innerHTML) {
        retrieveClass(el).then((res) => {
          setCurrentClass({
            title: el,
            pointsTotal: res.reduce((acc, curr) => {
              return acc + curr.points;
            }, 0),
            pointsToday: 0,
            selection: [],
          });
        });
      }
    });
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
        {classGroup.map((el) => {
          return (
            <li
              className={
                showListItems
                  ? `${classes.classSymbol}`
                  : `${classes.classSymbol} ${classes.hidden}`
              }
              key={el}
            >
              {el}
            </li>
          );
        })}
      </span>
    </div>
  );
};

export default Header;
