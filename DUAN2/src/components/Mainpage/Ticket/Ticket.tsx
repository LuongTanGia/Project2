import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchTickets } from "../../../store/ticketSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import "./ticket.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Loading from "../utils/loading/Loading";
import { DatePicker, Space } from "antd";

const Ticket: React.FC = () => {
    const [picker, setPicker] = useState<
        "date" | "time" | "month" | "week" | "quarter" | "year" | undefined
    >("date");
    const onChange = (date: any, dateString: any) => {
        console.log(date, dateString);
    };
    const { data, loading, error } = useSelector(
        (state: RootState) => state.ticket
    );

    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="Ticket_page">
            <h1 className="title">Danh sách vé</h1>
            <div className="Ticket_center">
                <div className="search_Ticket">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm bằng số vé"
                    />
                    <i className="input_icon">
                        <AiOutlineSearch />
                    </i>
                </div>
                <div className="filter">
                    <button
                        type="button"
                        className="btn btn_filter"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                    >
                        <FiFilter /> Lọc vé
                    </button>
                    <button type="button" className="btn btn_xuat">
                        Xuất file (.csv)
                    </button>

                    {/* ------------------------------ */}
                    <div
                        className="modal fade"
                        id="exampleModalCenter"
                        // tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content Model">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLongTitle"
                                    >
                                        Lọc vé
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    <div className="DatePickerBox">
                                        <div className="date_box">
                                            <p className="title">Từ ngày</p>
                                            <DatePicker
                                                onChange={onChange}
                                                picker={picker}
                                            />
                                        </div>
                                        <div className="date_box">
                                            <p className="title">Từ ngày</p>
                                            <DatePicker
                                                onChange={onChange}
                                                picker={picker}
                                            />
                                        </div>
                                    </div>
                                    <div className="StatusBox">
                                        <p className="title">
                                            Tình trạng sử dụng
                                        </p>
                                        <div className="checkBox">
                                            <div className="input_check">
                                                <label htmlFor="status">
                                                    Tất cả
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                />
                                            </div>
                                            <div className="input_check">
                                                <label htmlFor="status">
                                                    Đã sử dụng
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                />
                                            </div>
                                            <div className="input_check">
                                                <label htmlFor="status">
                                                    Chưa sử dụng
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                />
                                            </div>
                                            <div className="input_check">
                                                <label htmlFor="status">
                                                    Hết hạn
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="CheckIn">
                                        <p className="title">Cổng Check - in</p>
                                        <div className="checkBox">
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Tất cả
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Cổng 1
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Cổng 2
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Cổng 3
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Cổng 4
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                            <div className="input_checkBox">
                                                <label htmlFor="checkIn">
                                                    Cổng 5
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    name="checkIn"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn_filter-model"
                                        data-dismiss="modal"
                                    >
                                        Lọc
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr className="header_table">
                            <th className="title">STT</th>
                            <th>Booking code</th>
                            <th>Số vé</th>
                            <th>Tên sự kiện</th>
                            <th>Tình trạng sử dụng</th>
                            <th>Ngày sử dụng</th>
                            <th>Ngày xuất vé</th>
                            <th>Cổng check - in</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ticket, index) => (
                            <tr
                                key={ticket.id.toString()}
                                className="header_table"
                            >
                                <td className="stt">{++index}</td>
                                <td>{ticket.Bookingcode}</td>
                                <td>{ticket.Sove}</td>
                                <td>{ticket.TenSuKien}</td>
                                <td>
                                    <span
                                        className={`TrangThai ${
                                            ticket.TrangThai == "On"
                                                ? "On"
                                                : "Off"
                                        }

                                `}
                                    >
                                        {ticket.TrangThai == "On"
                                            ? "Đã sử dụng"
                                            : "Chưa sử dụng"}
                                    </span>
                                </td>
                                <td>{ticket.NgaySuDung}</td>
                                <td>{ticket.NgayXuatVe}</td>
                                <td>{ticket.CongCheckIn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ticket;
