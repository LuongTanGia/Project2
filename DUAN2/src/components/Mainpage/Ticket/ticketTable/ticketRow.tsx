import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

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

interface TicketRowProps {
    ticket: Ticket;
    index: number;
    handleOpen: (id: string) => void;
}
const TicketRow: React.FC<TicketRowProps> = ({ ticket, index, handleOpen }) => {
    return (
        <tr className="header_table">
            <td className="stt">{index + 1}</td>
            <td>{ticket.Bookingcode}</td>
            <td>{ticket.Sove}</td>
            <td>{ticket.TenSuKien}</td>
            <td>
                <span
                    className={`TrangThai ${
                        ticket.TrangThai == "On"
                            ? "On"
                            : ticket.TrangThai == "Off"
                            ? "Off"
                            : "Het"
                    }`}
                >
                    {ticket.TrangThai == "On"
                        ? "Đã sử dụng"
                        : ticket.TrangThai == "Off"
                        ? "Chưa sử dụng"
                        : "Hết hạn"}
                </span>
            </td>
            <td>{ticket.NgaySuDung}</td>
            <td>{ticket.NgayXuatVe}</td>
            <td>
                {ticket.CongCheckIn}
                <button
                    onClick={() => handleOpen(ticket.id)}
                    className="btn_editTicket"
                    data-toggle="modal"
                    data-target="#exampleModalCenter2"
                >
                    <HiEllipsisVertical />
                </button>
            </td>
        </tr>
    );
};

export default TicketRow;
