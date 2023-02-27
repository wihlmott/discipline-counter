import { useContext, useEffect, useState } from "react";
import { ClassContext } from "../Context/ClassContext";
import classes from "./PointButton.module.css";

const PointButton = (props) => {
  const { currentClass, setCurrentClass } = useContext(ClassContext);

  const [used, setUsed] = useState(false);

  //if title changes, set buttons to unused
  useEffect(() => {
    setUsed(false);
  }, [currentClass.title]);

  const clicked = () => {
    setUsed(!used);

    if (used === false) {
      setCurrentClass((prev) => {
        const pointsToday = prev.pointsToday;
        const selection = [...prev.selection, props.points.title];

        return {
          ...prev,
          pointsToday: pointsToday + props.points.value,
          selection: selection,
        };
      });
    }
    if (used === true) {
      setCurrentClass((prev) => {
        const pointsToday = prev.pointsToday;
        const selection = prev.selection.filter((el) => {
          return el !== props.points.title;
        });

        return {
          ...prev,
          pointsToday: pointsToday - props.points.value,
          selection: selection,
        };
      });
    }
  };
  return (
    <div
      className={
        used
          ? `${classes.pointButton} ${classes.used}`
          : `${classes.pointButton}`
      }
      onClick={clicked}
    >
      <p className={classes.text}>{props.points.title}</p>
      <div className={classes.value}>{props.points.value}</div>
    </div>
  );
};

export default PointButton;
