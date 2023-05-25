import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./not_found/NotFound";
import Ticket from "./Ticket/Ticket";
import Home from "./HomePage/Home";

const Pages: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Pages;
