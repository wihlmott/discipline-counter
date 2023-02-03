import classes from './LoginPage.module.css';

const LoginPage = ({passwordHandler}) => {
    let password;

    const savePassword = (e) => {
        password = e.target.value;
    }
    const sendPassword = () => {
        passwordHandler(password);
    }

    return <div className={classes.passwordDiv}>
        <label>enter password:</label>
        <input className={classes.password} type='password' onChange={savePassword}/>
        <button className={classes.btn} onClick={sendPassword}>enter</button>
    </div>
}

export default LoginPage;