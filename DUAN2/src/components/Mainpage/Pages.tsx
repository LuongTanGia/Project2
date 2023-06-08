import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./utils/not_found/NotFound";
import Ticket from "./Ticket/Ticket";
import Home from "./HomePage/Home";
import AddData from "../../store/middleware";
import CheckTicket from "./Ticket/checkTicket/checkTicket";
import Setting from "../Mainpage/GoiDichVu/GoiVe";

const Pages: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/Invoice" element={<CheckTicket />} />
                <Route path="/Setting" element={<Setting />} />

                <Route path="/addData" element={<AddData />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default Pages;
