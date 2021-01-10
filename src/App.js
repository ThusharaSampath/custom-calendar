import React from 'react';
import CustomCalendar from "./CustomCalendar"
import './App.css';

function App() {
    return (
        <div className="App" style={{
            display: "grid",
            placeItems: "center",
            height:"100vh",
        }}>
            <CustomCalendar/>
        </div>
    );
}

export default App;
