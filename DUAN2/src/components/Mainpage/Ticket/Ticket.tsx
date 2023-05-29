import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { searchTickets, setSearchTerm } from "../../../store/ticketSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import "./ticket.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Loading from "../utils/loading/Loading";
import { DatePicker } from "antd";
import Pagination from "../utils/pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";

import { HiEllipsisVertical } from "react-icons/hi2";
import EditTicketComponent from "./updateTicket/updateTicket";

const Ticket: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [openTicketId, setOpenTicketId] = useState(null);

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
        dispatch(searchTickets());
    }, [dispatch]);

    const searchTerm = useSelector(
        (state: RootState) => state.ticket.searchTerm
    );

    const handleSearch = () => {
        dispatch(searchTickets());
    };

    const handleSearchTermChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

    const handleOpen = (ticketId: any) => {
        setOpenTicketId(ticketId);
    };

    return (
        <div className="Ticket_page">
            <div className="Ticket_page_content">
                <h1 className="title">Danh sách vé</h1>
                <div className="Ticket_center">
                    <div className="search_Ticket">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Tìm bằng số vé"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <i className="input_icon">
                            <AiOutlineSearch onClick={handleSearch} />
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
                                                        value=""
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_check">
                                                    <label htmlFor="status">
                                                        Đã sử dụng
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="On"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_check">
                                                    <label htmlFor="status">
                                                        Chưa sử dụng
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Off"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_check">
                                                    <label htmlFor="status">
                                                        Hết hạn
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Het"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="CheckIn">
                                            <p className="title">
                                                Cổng Check - in
                                            </p>
                                            <div className="checkBox">
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Tất cả
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value=""
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Cổng 1
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value="Cổng 1"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Cổng 2
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value="Cổng 2"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Cổng 3
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value="Cổng 3"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Cổng 4
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value="Cổng 4"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
                                                    />
                                                </div>
                                                <div className="input_checkBox">
                                                    <label htmlFor="checkIn">
                                                        Cổng 5
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name="checkIn"
                                                        value="Cổng 5"
                                                        onChange={
                                                            handleSearchTermChange
                                                        }
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
                                            onClick={handleSearch}
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
                            {currentItems.length > 0 ? (
                                <>
                                    {currentItems.map((ticket, index) => (
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
                                                            : ticket.TrangThai ==
                                                              "Off"
                                                            ? "Off"
                                                            : "Het"
                                                    }

                                `}
                                                >
                                                    {ticket.TrangThai == "On"
                                                        ? "Đã sử dụng"
                                                        : ticket.TrangThai ==
                                                          "Off"
                                                        ? "Chưa sử dụng"
                                                        : "Hết hạn"}
                                                </span>
                                            </td>
                                            <td>{ticket.NgaySuDung}</td>
                                            <td>{ticket.NgayXuatVe}</td>
                                            <td>
                                                {ticket.CongCheckIn}
                                                <button
                                                    onClick={() =>
                                                        handleOpen(ticket.id)
                                                    }
                                                    className="btn_editTicket"
                                                    data-toggle="modal"
                                                    data-target="#exampleModalCenter2"
                                                >
                                                    <HiEllipsisVertical />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Loading />
                                </>
                            )}

                            <div
                                className="modal fade"
                                id="exampleModalCenter2"
                                // tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalCenterTitle"
                                aria-hidden="true"
                            >
                                <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                >
                                    <div className="modal-content modal-content2">
                                        {/* <div className="modal-header"></div> */}
                                        <div className="modal-body modal-body2">
                                            {openTicketId && (
                                                <div className="popup">
                                                    <div className="popup-content">
                                                        <EditTicketComponent
                                                            ticketId={
                                                                openTicketId
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* {currentItems.map((ticket, index) => (
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
                        ))} */}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={data.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Ticket;
