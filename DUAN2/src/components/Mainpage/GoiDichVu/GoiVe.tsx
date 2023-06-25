import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
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
import Pagination from "../utils/pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "./Goive.css";
import CreateGoive from "./CreateGoive/creategoive";
import EditHomeTicketForm from "./EditGoive/editgoive";

const HomeTicket: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [openTicketId, setOpenTicketId] = useState(null);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
        null
    );

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

    const handleEditTicket = (ticketId: string) => {
        setSelectedTicketId(ticketId);
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
                        <button type="button" className="btn btn_xuat">
                            Xuất file (.csv)
                        </button>
                        <button
                            data-dismiss="modal"
                            className="btn_Create"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                        >
                            Thêm gói vé
                        </button>

                        <div
                            className="modal fade"
                            id="exampleModalCenter"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                        >
                            <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                            >
                                <div className="modal-content modal-content_Home">
                                    <div className="modal-body modal-body_Home">
                                        <CreateGoive />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal fade"
                            id="exampleModalCenter2"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                        >
                            <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                            >
                                <div className="modal-content modal-content_Home">
                                    <div className="modal-body modal-body_Home">
                                        <EditHomeTicketForm
                                            ticketId={selectedTicketId}
                                        />
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
                                <th>Mã gói</th>
                                <th>Tên gói vé</th>

                                <th>Ngày áp dụng</th>
                                <th>Ngày hết hạn</th>
                                <th>Giá vé (VNĐ/Vé)</th>
                                <th>Giá Combo (VNĐ/Combo)</th>
                                <th>Tình trạng</th>
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
                                            <td>
                                                {ticket.NgayApDung}{" "}
                                                {ticket.timeAD}
                                            </td>

                                            <td>
                                                {ticket.NgayHetHan}{" "}
                                                {ticket.timeHH}
                                            </td>
                                            <td>{ticket.GiaVe} VNĐ</td>
                                            <td>
                                                {ticket.GiaCombo} VNĐ/{" "}
                                                {ticket.SoveCB} Vé VNĐ
                                            </td>
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
                                            <td className="td_edit">
                                                <span
                                                    onClick={() =>
                                                        handleEditTicket(
                                                            ticket.id
                                                        )
                                                    }
                                                    data-dismiss="modal"
                                                    data-toggle="modal"
                                                    data-target="#exampleModalCenter2"
                                                >
                                                    <SlNote />
                                                    Cập nhật
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Loading />
                                </>
                            )}
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
