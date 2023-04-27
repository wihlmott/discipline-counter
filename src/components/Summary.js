import { useEffect, useState } from "react";
import { retrieveClass } from "../Firebase";

const Summary = ({ classGroup }) => {
  const [retrievedData, setRetrievedData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await retrieveClass(classGroup);
      data.map((el) => {
        setRetrievedData((prev) => {
          return [
            ...prev,
            {
              id: el.id,
              points: el.points,
              selection: el.selection,
            },
          ];
        });
      });
    })();
  }, []);

  return (
    <>
      {retrievedData.map((el) => {
        console.log(el);
        return (
          <>
            <div>{el.id}</div>
            <div>points: {el.points}</div>
            <div>achieved: {el.selection}</div>
            <br />
          </>
        );
      })}
    </>
  );
};

export default Summary;
