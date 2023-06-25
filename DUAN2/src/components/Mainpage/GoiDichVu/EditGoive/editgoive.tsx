import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editHomeTicket, HomeTicket } from "../../../../store/HomeTicket";
import { RootState } from "../../../../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;
interface EditHomeTicketFormProps {
    ticketId: string | null;
}

const EditHomeTicketForm: React.FC<EditHomeTicketFormProps> = ({
    ticketId,
}) => {
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(true);

    const handleCheckboxChange1 = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked1(event.target.checked);
    };
    const handleCheckboxChange2 = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked2(event.target.checked);
    };
    const dispatch: AppDispatch = useDispatch();
    const ticket = useSelector((state: RootState) =>
        state.hometicket.HomeData.find((ticket) => ticket.id === ticketId)
    );

    const [editedTicket, setEditedTicket] = useState<HomeTicket | null>(null);

    useEffect(() => {
        if (ticket) {
            setEditedTicket({ ...ticket });
        }
    }, [ticket]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setEditedTicket((prevTicket: any) => ({
            ...prevTicket,
            [e.target.name]: e.target.value,
        }));
    };
    const handleInputChang2 = (selectedValue: string) => {
        setEditedTicket((prevTicket: any) => ({
            ...prevTicket,
            TinhTrang: selectedValue,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editedTicket) {
            dispatch(editHomeTicket(editedTicket));
        }
    };

    if (!editedTicket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form_create_Home">
            <h2 className="title">Cập nhật thông tin gói vé</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="contentBox">
                        <div className="content1">
                            <label htmlFor="MaGoi">Mã sự kiện</label>
                            <input
                                type="text"
                                name="MaGoi"
                                id="MaGoi"
                                value={editedTicket.MaGoi.toString()}
                                onChange={handleInputChange}
                                placeholder="Ten Goi"
                            />
                        </div>
                        <div className="content2">
                            <label htmlFor="TenSuKien">Tên sự kiện</label>
                            <input
                                type="text"
                                name="TenSuKien"
                                id="TenSuKien"
                                value={editedTicket.TenSuKien.toString()}
                                onChange={handleInputChange}
                                placeholder="Ten Goi"
                            />
                        </div>
                    </div>

                    <div className="Input_DateBox">
                        <div className="">
                            <label htmlFor="NgayApDung">Ngày áp dụng</label>
                            <input
                                type="date"
                                name="NgayApDung"
                                id="NgayApDung"
                                value={editedTicket.NgayApDung}
                                onChange={handleInputChange}
                                placeholder="Ngay Ap Dung"
                            />
                            <input
                                type="time"
                                name="timeAD"
                                id="timeAD"
                                value={editedTicket.timeAD.toString()}
                                onChange={handleInputChange}
                                placeholder="Ngay Het Hang"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="NgayHetHan">Ngày hết hạn</label>

                            <input
                                type="date"
                                name="NgayHetHan"
                                id="NgayHetHan"
                                value={editedTicket.NgayHetHan}
                                onChange={handleInputChange}
                                placeholder="Ngay Het Hang"
                            />
                            <input
                                type="time"
                                name="timeHH"
                                id="timeHH"
                                value={editedTicket.timeHH.toString()}
                                onChange={handleInputChange}
                                placeholder="Ngay Het Hang"
                            />
                        </div>
                    </div>

                    <label htmlFor="">Giá vé áp dụng</label>
                    <div className="Total_Box">
                        <div className="box1">
                            <input
                                type="checkbox"
                                checked={isChecked1}
                                onChange={handleCheckboxChange1}
                            />
                            <p>Vé lẻ (vnđ/vé) với giá</p>

                            <input
                                type="text"
                                name="GiaVe"
                                value={editedTicket.GiaVe.toString()}
                                onChange={handleInputChange}
                                placeholder="Gia Ve"
                                disabled={!isChecked1}
                            />
                            <p>/ vé</p>
                        </div>
                        <div className="box2">
                            <input
                                type="checkbox"
                                checked={isChecked2}
                                onChange={handleCheckboxChange2}
                            />
                            <p>Combo vé với giá</p>
                            <input
                                type="text"
                                name="GiaCombo"
                                value={editedTicket.GiaCombo.toString()}
                                onChange={handleInputChange}
                                placeholder="Giá vé"
                                disabled={!isChecked2}
                            />
                            <p>/</p>
                            <input
                                type="text"
                                name="SoveCB"
                                value={editedTicket.SoveCB}
                                onChange={handleInputChange}
                                placeholder="Giá vé"
                                disabled={!isChecked2}
                            />
                            <p>vé</p>
                        </div>
                    </div>
                </div>
                <div className="TinhTrang">
                    <label htmlFor="TinhTrang">Tình trạng</label>
                    <select
                        id="TinhTrang"
                        name="TinhTrang"
                        value={editedTicket.TinhTrang.toString()}
                        onChange={(e) => handleInputChang2(e.target.value)}
                    >
                        <option value="Het">Tắt</option>
                        <option value="Off">Đang áp dụng</option>
                    </select>
                </div>
                <div className="button_Box">
                    <button type="submit" className="btn_create_goive">
                        Lưu
                    </button>
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn_Huy_goive"
                    >
                        Huy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditHomeTicketForm;
