import React, {useState} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {Paper, Grid} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#e91e63",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "deepPurple",
            },
        },
    },
});

export const styles = makeStyles(() => ({

    notInThisMonthDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#fce4ec",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
    },
    normalDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#f8bbd0",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
        color:"#880e4f",
        fontWeight:"bold"
    },
    selectedDayPaper: {
        width: "31px",
        height: "31px",
        backgroundColor: "#f06292",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#d81b60",
        padding: "1px",
        cursor: "pointer",
    },
    todayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "purple",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
        color: " white",
    },

}));


export default function CustomCalendar() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes = styles();
    const today = new Date();
    const sunnyDays = [1, 6, 10, 24, 15]
    const cloudyDays = [ 30, 4, 13,21]
    const snowyDays = [25,3,12,11,27]

    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
        const isSunny = sunnyDays.includes(day.getDate());
        const isCloudy = cloudyDays.includes(day.getDate());
        const isSnow = snowyDays.includes(day.getDate());
        const isSelected = day.getDate() === selectedDate.getDate();
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
        console.log(day.getTime())
        let dateTile
        if (isInCurrentMonth) {
            if (isSunny) {
                dateTile = (
                    <Paper
                        className={
                            isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper
                        }
                    >
                        <Grid item>
                            <FavoriteIcon style={{color: "red"}}/>
                        </Grid>
                        <Grid item>
                            {day.getDate()}
                        </Grid>
                    </Paper>)
            } else if (isCloudy) {
                dateTile = (<Paper
                    className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                >
                    <Grid item>
                        <MusicNoteIcon style={{color: "purple"}}/>

                    </Grid>
                    <Grid item> {day.getDate()}</Grid>
                </Paper>)
            } else if (isSnow) {
                dateTile = (
                    <Paper
                        className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                    >
                        <Grid item>
                            <EmojiFoodBeverageIcon style={{color: "#4caf50"}}/>
                        </Grid>
                        <Grid item> {day.getDate()}</Grid>
                    </Paper>
                )
            } else {
                dateTile = (<Paper
                    className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}
                >
                    <Grid item>
                        <br/>
                    </Grid>
                    <Grid item> {day.getDate()}</Grid>
                </Paper>)
            }

        } else {
            dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
                <Grid item>
                    <br/>
                </Grid>
                <Grid item style={{color: "lightGrey"}}>
                    {day.getDate()}
                </Grid>
            </Paper>)
        }
        return dateTile
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        variant="static"
                        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
                    />

                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    );
}

