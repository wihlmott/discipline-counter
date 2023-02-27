import { useEffect } from "react";
import { useState } from "react";
import { classGroup } from "../Config/Config";
import { retrieveClass } from "../Firebase";
import classes from "./AllScores.module.css";

const AllScores = () => {
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    classGroup.forEach(async (el) => {
      const classEntries = await retrieveClass(el);
      const score = classEntries.reduce((acc, curr) => {
        return acc + curr.points;
      }, 0);
      setAllScores((prev) => [...prev, score]);
    });
  }, []);

  return (
    <div className={classes.allScores}>
      {classGroup.map((group, i) => {
        return (
          <div key={group}>
            <span className={classes.groupName}>{group}</span>
            <span className={classes.text}>{`total score -- `}</span>
            <span className={classes.score}>{allScores[i]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AllScores;
