import classes from "./LoginPage.module.css";

const LoginPage = ({ passwordHandler }) => {
  let password;

  const savePassword = (e) => {
    password = e.target.value;
  };
  const sendPassword = (e) => {
    e.preventDefault();
    passwordHandler(password);
  };

  return (
    <form className={classes.passwordDiv}>
      <label>enter password:</label>
      <input
        className={classes.password}
        type="password"
        onChange={savePassword}
      />
      <button type="submit" className={classes.btn} onClick={sendPassword}>
        enter
      </button>
    </form>
  );
};

export default LoginPage;
