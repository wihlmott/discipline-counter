import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PointButton from "./components/PointButton";
import { ClassContext } from "./Context/ClassContext";
import { points } from "./Config/Config";
import LoginPage from "./components/LoginPage";

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
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({
    title: "SIGN-IN",
    pointsTotal: 0,
    pointsToday: 0,
  });
  const showListItemsFn = (e) => {
    setMenuOpen(e);
  }
  const passwordHandler = (password) => {
    if(password === '3,14159'){
      setSignedIn(true);
      setCurrentClass({title: 'welcome'})};
  }

  return (
    <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
      <Header
        title={`selected class here`}
        total={10}
        classNames={classNames}
        showListItemsFn={showListItemsFn}
        signedIn={signedIn}
      />
      {currentClass.title==='SIGN-IN' && <LoginPage passwordHandler={passwordHandler}/>}
      {!menuOpen &&<div className='bodyClass'>
      {currentClass.title!==`SIGN-IN` && currentClass.title!==`welcome` && points.map((el) => {
        return <PointButton points={el} key={el.title} />;
      })}

      </div>}
      <Footer pointsTotal={currentClass.pointsTotal}/>
    </ClassContext.Provider>
  );
}

export default App;
