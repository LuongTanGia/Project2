import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
// import { searchHomeTickets, setSearchHomeTerm } from "../../../store/ticketSlice";
import {
    searchHomeTickets,
    setSearchHomeTerm,
} from "../../../store/HomeTicket";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Loading from "../utils/loading/Loading";
import { DatePicker } from "antd";
import Pagination from "../utils/pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";

import { HiEllipsisVertical } from "react-icons/hi2";

const HomeTicket: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [openTicketId, setOpenTicketId] = useState(null);

    const [picker, setPicker] = useState<
        "date" | "time" | "month" | "week" | "quarter" | "year" | undefined
    >("date");

    const onChange = (date: any, dateString: any) => {
        console.log(date, dateString);
    };

    const { HomeData, loading, error } = useSelector(
        (state: RootState) => state.hometicket
    );

    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(searchHomeTickets());
    }, [dispatch]);

    const searchHomeTerm = useSelector(
        (state: RootState) => state.hometicket.searchHomeTerm
    );

    const handleHomeSearch = () => {
        dispatch(searchHomeTickets());
    };

    const handleSearchHomeTermChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setSearchHomeTerm(event.target.value));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = HomeData.slice(indexOfFirstItem, indexOfLastItem);
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
                            value={searchHomeTerm}
                            onChange={handleSearchHomeTermChange}
                        />
                        <i className="input_icon">
                            <AiOutlineSearch onClick={handleHomeSearch} />
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                                            handleSearchHomeTermChange
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
                                            onClick={handleHomeSearch}
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
                                <th></th>
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
                                            <td>{ticket.MaGoi}</td>
                                            <td>{ticket.TenGoi}</td>
                                            <td>{ticket.NgayApDung}</td>

                                            <td>{ticket.NgayHetHan}</td>
                                            <td>{ticket.GiaVe}</td>
                                            <td>{ticket.GiaCombo}</td>
                                            <td>
                                                <span
                                                    className={`TrangThai ${
                                                        ticket.TinhTrang ==
                                                        "Off"
                                                            ? "Off"
                                                            : ticket.TinhTrang ==
                                                              "Het"
                                                            ? "Het"
                                                            : ""
                                                    }

                                `}
                                                >
                                                    {ticket.TinhTrang == "Off"
                                                        ? "Đang áp dụng"
                                                        : ticket.TinhTrang ==
                                                          "Het"
                                                        ? "Tắt"
                                                        : ""}
                                                </span>
                                            </td>
                                            <td>
                                                <SlNote /> Cập nhật
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
                        totalItems={HomeData.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeTicket;
