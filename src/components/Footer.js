import { useContext, useState } from "react";
import { ClassContext } from "../Context/ClassContext";
import AllScores from "./AllScores";
import classes from "./Footer.module.css";
import { FaAngleDoubleUp } from "react-icons/fa";
import { setScore } from "../Firebase";

const Footer = ({ pointsTotal }) => {
  const { currentClass, setCurrentClass } = useContext(ClassContext);
  const [showAllScores, setShowAllScores] = useState(false);

  const addPointsToTotal = () => {
    // const initialPoints = currentClass.pointsTotal;
    // setCurrentClass((prev) => {
    //   return { ...prev, pointsTotal: initialPoints + prev.pointsToday };
    // });
    const now = new Date();
    setScore(currentClass.title, now, {
      points: currentClass.pointsToday,
      selection: `used`,
    });
  };

  const toggleShowScore = () => {
    setShowAllScores(!showAllScores);
  };

  return (
    <div className={classes.footer}>
      {!showAllScores && <span>total points: </span>}
      {!showAllScores && <span className={classes.total}>{pointsTotal}</span>}
      {!showAllScores && (
        <span className={classes.submit} onClick={addPointsToTotal}>
          submit
        </span>
      )}
      <FaAngleDoubleUp
        className={
          showAllScores
            ? `${classes.upArrowIcon} ${classes.rotateIcon}`
            : `${classes.upArrowIcon}`
        }
        onClick={toggleShowScore}
      />
      {showAllScores && <AllScores />}
    </div>
  );
};

export default Footer;
