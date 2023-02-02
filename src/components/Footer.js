import { useContext } from 'react'
import { ClassContext } from '../Context/ClassContext'
import classes from './Footer.module.css'

const Footer = ({pointsTotal}) => {
    const { currentClass, setCurrentClass } = useContext(ClassContext);

    const addPointsToTotal = () => {
        const initialPoints = currentClass.pointsTotal;
        setCurrentClass((prev)=>{return {...prev, pointsTotal: initialPoints+prev.pointsToday}}) 
    }

    return <div className={classes.footer}>
        <span>total points: </span>
        <span className={classes.total}>{pointsTotal}</span>
        <span className={classes.submit} onClick={addPointsToTotal}>submit</span>
    </div>
}

export default Footer;