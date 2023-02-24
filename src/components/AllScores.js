import { useEffect } from "react";
import { useState } from "react";
import { retrieveClasses } from "../Firebase";
import classes from "./AllScores.module.css";

const AllScores = () => {
  const [allClasses, setAllClasses] = useState();

  useEffect(() => {
    retrieveClasses().then((res) => setAllClasses(res));
  }, []);

  if (!allClasses) return;
  return (
    <div className={classes.allScores}>
      {allClasses.map((group) => {
        return (
          <div>
            <span className={classes.groupName}>{group.id}</span>
            <span className={classes.text}>{`total score -- `}</span>
            <span className={classes.score}>{group.totalScore}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AllScores;
