import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { updateTicket } from "../../../../store/ticketSlice";
import { RootState } from "../../../../store/store";
import "./updateTicket.css";
import moment from "moment";
import { DatePicker } from "antd";
// Define the type for the dispatch function
type AppDispatch = ThunkDispatch<any, any, AnyAction>;

interface EditTicketComponentProps {
    ticketId: string;
}
interface Ticket {
    id: string;
    Bookingcode: string;
    CongCheckIn: string;
    NgaySuDung: string;
    NgayXuatVe: string;
    Sove: string;
    TenSuKien: string;
    TrangThai: string;
    LoaiVe: string;
    TinhTrang: string;
}
const EditTicketComponent: React.FC<EditTicketComponentProps> = ({
    ticketId,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const ticket = useSelector((state: RootState) =>
        state.ticket.data.find((t: Ticket) => t.id === ticketId)
    );
    const [picker, setPicker] = useState<
        "date" | "time" | "month" | "week" | "quarter" | "year" | undefined
    >("date");
    const [openTicketId, setOpenTicketId] = useState(null);
    const [bookingCode, setBookingCode] = useState("");
    const [congCheckIn, setCongCheckIn] = useState("");
    const [ngaySuDung, setNgaySuDung] = useState("");
    const [ngayXuatVe, setNgayXuatVe] = useState("");
    const [sove, setSove] = useState("");
    const [tenSuKien, setTenSuKien] = useState("");
    const [trangThai, setTrangThai] = useState("");
    const [loaiVe, setLoaiVe] = useState("");
    const [tinhtrang, setTinhTrang] = useState("");

    // ... other ticket fields
    const onChange = (date: moment.Moment | any, dateString: string) => {
        if (date) {
            const formattedDate = date.format("DD/MM/YYYY");
            setNgaySuDung(formattedDate);
            console.log(formattedDate);
        }
    };
    useEffect(() => {
        if (ticket) {
            setBookingCode(ticket.Bookingcode);
            setCongCheckIn(ticket.CongCheckIn);
            setNgaySuDung(ticket.NgaySuDung);
            setNgayXuatVe(ticket.NgayXuatVe);
            setTrangThai(ticket.TrangThai);
            setSove(ticket.Sove);
            setTenSuKien(ticket.TenSuKien);
            setLoaiVe(ticket.LoaiVe);
            setTinhTrang(ticket.TinhTrang); // this
        }
    }, [ticket]);

    const handleSave = () => {
        const updatedTicket = {
            id: ticketId,
            Bookingcode: bookingCode,
            CongCheckIn: congCheckIn,
            NgaySuDung: ngaySuDung,
            NgayXuatVe: ngayXuatVe,
            Sove: sove,
            TenSuKien: tenSuKien,
            TrangThai: trangThai,
            LoaiVe: loaiVe,
            TinhTrang: tinhtrang,
        };

        dispatch(updateTicket(updatedTicket));
    };
    const handleClose = () => {
        setOpenTicketId(null);
    };
    return (
        <>
            <h1 className="title_h1">Đổi ngày sử dụng vé</h1>
            <div className="edit_TicketBox">
                <div className="edit_Item">
                    <label>Số vé</label>
                    <p>{bookingCode}</p>
                </div>
                <div className="edit_Item">
                    <label>Cổng</label>
                    <p>{congCheckIn}</p>
                </div>

                <div className="edit_Item">
                    <label>Tên sự kiện</label>
                    <p>{tenSuKien}</p>
                </div>
                <div className="edit_Item">
                    <label>Hạn sử dụng</label>

                    <div className="date_box">
                        <DatePicker onChange={onChange} picker={picker} />
                    </div>
                </div>
                <div className="btn_Box">
                    <button
                        className="btn_Exit"
                        onClick={handleClose}
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        data-dismiss="modal"
                        className="btn_Save"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditTicketComponent;
