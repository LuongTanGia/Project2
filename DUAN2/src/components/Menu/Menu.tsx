import React, { useState } from "react";
import Logo from "../../assets/imgs/Logo.svg";
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineTicket } from "react-icons/hi";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./menu.css";

const Menu: React.FC = () => {
    const [activeButton, setActiveButton] = useState(1);

    const handleClickLink = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };

    return (
        <div className="menu">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="listMenu">
                <Link
                    to="/"
                    className={`menu_item ${
                        activeButton === 1 ? "active " : ""
                    }`}
                    onClick={() => handleClickLink(1)}
                >
                    <i className="icon">
                        <BiHomeAlt />
                    </i>

                    <p className="title">Trang chủ</p>
                </Link>
                <Link
                    to="/ticket"
                    className={`menu_item ${
                        activeButton === 2 ? "active " : ""
                    }`}
                    onClick={() => handleClickLink(2)}
                >
                    <i className="icon">
                        <HiOutlineTicket />
                    </i>

                    <p className="title">Quản lý vé</p>
                </Link>
                <Link
                    to="/Invoice"
                    className={`menu_item ${
                        activeButton === 3 ? "active " : ""
                    }`}
                    onClick={() => handleClickLink(3)}
                >
                    <i className="icon">
                        <TbFileInvoice />
                    </i>

                    <p className="title">Đối soát vé</p>
                </Link>
                <Link
                    to="/setting"
                    className={`menu_item ${
                        activeButton === 4 ? "active " : ""
                    }`}
                    onClick={() => handleClickLink(4)}
                >
                    <i className="icon">
                        <AiOutlineSetting />
                    </i>

                    <p className="title">Cài đặt</p>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
