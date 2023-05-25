import React from "react";
import "./header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import Avatar from "../../assets/imgs/Up.jpg";

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
                <i className="input_icon">
                    <AiOutlineSearch />
                </i>
            </div>
            <div className="acc_mail">
                <i className="mail_icon">
                    <FiMail />
                </i>
                <i className="bell_icon">
                    <BiBell />
                </i>
                <img src={Avatar} alt="avatar" className="avatar" />
            </div>
        </div>
    );
};

export default Header;
