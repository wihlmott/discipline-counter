import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PointButton from "./components/PointButton";
import { ClassContext } from "./Context/ClassContext";
import { points } from "./Config/Config";

const classNames = [
  { className: `grade^11 A1`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E1`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E2`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E3`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E4`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E5`, totalPoints: 0, todaysPoints: 0 },
  { className: `grade^11 E6`, totalPoints: 0, todaysPoints: 0 },
];

function App() {
  const [currentClass, setCurrentClass] = useState({
    title: "SELECT CLASS",
    pointsTotal: 0,
    pointsToday: 0,
  });

  return (
    <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
      <Header
        title={`selected class here`}
        total={10}
        classNames={classNames}
      />
      {currentClass.title!==`SELECT CLASS` && points.map((el) => {
        return <PointButton points={el} key={el.title} />;
      })}
      <Footer pointsTotal={currentClass.pointsTotal}/>
    </ClassContext.Provider>
  );
}

export default App;
