import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

function App() {
    const [phoneFirstPart, setPhoneFirstPart] = useState("153")
    const [phoneSecondPart, setPhoneSecondPart] = useState("9948")
    const [places, setPlaces] = useState("陕西省西安市*")
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/settings"
                       element={<SettingsPage
                           phoneFirstPart={phoneFirstPart}
                           phoneSecondPart={phoneSecondPart}
                           setPhoneFirstPart={setPhoneFirstPart}
                           setPhoneSecondPart={setPhoneSecondPart}
                />}/>
                <Route path="/" element={<MainPage phoneFirstPart={phoneFirstPart} phoneSecondPart={phoneSecondPart}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
