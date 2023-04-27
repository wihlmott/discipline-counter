import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PointButton from "./components/PointButton";
import { ClassContext } from "./Context/ClassContext";
import { classGroup, points } from "./Config/Config";
import classes from "./App.module.css";
import LoginPage from "./components/LoginPage";
import Summary from "./components/Summary";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSummary, setShowSummary] = useState({
    show: false,
    classGroup: "",
  });
  const [currentClass, setCurrentClass] = useState({
    title: "SIGN-IN",
    pointsTotal: 0,
    pointsToday: 0,
  });
  const showSummaryHandler = (e) => {
    setShowSummary((prev) => {
      return {
        show: !prev.show,
        classGroup: `${
          prev.show ? "" : e.target.innerHTML.split("-")[1].trim()
        }`,
      };
    });
  };
  const showListItemsFn = (e) => {
    setMenuOpen(e);
  };
  const passwordHandler = (password) => {
    if (password === "3,14159") {
      setSignedIn(true);
      setCurrentClass({ title: "welcome" });
    }
  };

  return (
    <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
      <Header
        title={`selected class here`}
        total={10}
        showListItemsFn={showListItemsFn}
        signedIn={signedIn}
      />
      {currentClass.title === "SIGN-IN" && (
        <LoginPage passwordHandler={passwordHandler} />
      )}
      {!menuOpen && (
        <div className="bodyClass">
          {currentClass.title !== `SIGN-IN` &&
            currentClass.title !== `welcome` &&
            points.map((el) => {
              return <PointButton points={el} key={el.title} />;
            })}
          {currentClass.title === `welcome` && (
            <>
              {showSummary.show ? (
                <div
                  className={classes.summaryBtn}
                  onClick={showSummaryHandler}
                >
                  close summary
                </div>
              ) : (
                classGroup.map((el) => (
                  <div
                    className={classes.summaryBtn}
                    key={el}
                    onClick={showSummaryHandler}
                  >
                    summary of - {el}
                  </div>
                ))
              )}
              {showSummary.show && (
                <Summary classGroup={showSummary.classGroup} />
              )}
            </>
          )}
        </div>
      )}
      <Footer pointsTotal={currentClass.pointsTotal} />
    </ClassContext.Provider>
  );
}

export default App;
