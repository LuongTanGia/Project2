import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { searchTickets, setSearchTerm } from "../../../../store/ticketSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import "./checkTicket.css";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Loading from "../../utils/loading/Loading";
import { DatePicker } from "antd";
import Pagination from "../../utils/pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";

const CheckTicket: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

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
    const myStyle = {
        fontFamily: "Montserrat",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "22px",
        display: "flex",
        alignItems: "center",
        color: "#FD5959",
    };

    return (
        <div className="Check_ticket_page">
            <div className="Ticket_page Ticket_Check_Left">
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
                        {/* <div className="filter">
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
                    </div> */}
                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr className="header_table_check header_table">
                                    <th>STT</th>
                                    <th>Số vé</th>
                                    <th>Tên sự kiện</th>
                                    <th>Ngày sử dụng</th>
                                    <th>Loại vé</th>
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
                                                className="header_table_check header_table"
                                            >
                                                <td>{++index}</td>
                                                <td>{ticket.Sove}</td>
                                                <td>{ticket.TenSuKien}</td>
                                                <td>{ticket.NgaySuDung}</td>
                                                <td>{ticket.LoaiVe}</td>
                                                <td>{ticket.CongCheckIn}</td>
                                                <td
                                                    style={
                                                        ticket.TinhTrang ===
                                                        "Đã đối soát"
                                                            ? { ...myStyle }
                                                            : {}
                                                    }
                                                >
                                                    {ticket.TinhTrang}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Loading />
                                    </>
                                )}

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

            <div className="filter_box">
                <div className="filter_content">
                    <h5 className="title">Lọc vé</h5>
                    <div className="content_body">
                        <div className="TrangThaiBox">
                            <p className="title">Tình trạng sử dụng</p>
                            <div className="checkBox">
                                <div className="input_check">
                                    <label htmlFor="status">Tất cả</label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value=""
                                        onChange={handleSearchTermChange}
                                    />
                                </div>
                                <div className="input_check">
                                    <label htmlFor="status">Đã đối soát</label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Đã đối soát"
                                        onChange={handleSearchTermChange}
                                    />
                                </div>
                                <div className="input_check">
                                    <label htmlFor="status">
                                        Chưa đối soát
                                    </label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Chưa đối soát"
                                        onChange={handleSearchTermChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="DatePickerBox">
                            <div className="date_box">
                                <p className="title">Từ ngày</p>
                                <DatePicker
                                    onChange={onChange}
                                    picker={picker}
                                />
                            </div>
                            <div className="date_box">
                                <p className="title">Đến ngày</p>
                                <DatePicker
                                    onChange={onChange}
                                    picker={picker}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="content_footer">
                        <button
                            type="button"
                            className="btn btn_filter_check"
                            data-dismiss="modal"
                            onClick={handleSearch}
                        >
                            Lọc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckTicket;
