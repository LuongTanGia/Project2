import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHomeTicket } from "../../../../store/HomeTicket";
import { RootState } from "../../../../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import "./creategoive.css";

const AddHomeTicketForm = () => {
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

    const [formData, setFormData] = useState({
        TenSuKien: "",
        GiaCombo: "",
        GiaVe: "",
        MaGoi: "ALT20210501",
        NgayApDung: "",
        Listve: [
            {
                Bookingcode: "",
                CongCheckIn: "Cổng 4",
                LoaiVe: "Vé cổng",
                NgaySuDung: "10/05/2023",
                NgayXuatVe: "14/04/2021",
                Sove: "156464891479",
                TenSuKien: "Hội chợ triển lãm tiêu dùng 2022",
                TinhTrang: "Chưa đối soát",
                TrangThai: "Het",
            },
        ],
        NgayHetHan: "",
        TenGoi: "",
        SoveCB: 0,
        TinhTrang: "",
        timeAD: "",
        timeHH: "",
    });

    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChangeTT = (selectedValue: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            TinhTrang: selectedValue,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createHomeTicket(formData));
    };

    return (
        <div className="form_create_Home">
            <h2 className="title">Thêm gói vé</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="TenGoi">Tên gói vé</label>
                    <input
                        type="text"
                        name="TenGoi"
                        id="TenGoi"
                        value={formData.TenGoi.toString()}
                        onChange={handleChange}
                        placeholder="Ten Goi"
                    />

                    <div className="Input_DateBox">
                        <div className="">
                            <label htmlFor="NgayApDung">Ngày áp dụng</label>
                            <input
                                type="date"
                                name="NgayApDung"
                                id="NgayApDung"
                                value={formData.NgayApDung.toString()}
                                onChange={handleChange}
                                placeholder="Ngay Ap Dung"
                            />
                            <input
                                type="time"
                                name="timeAD"
                                id="timeAD"
                                value={formData.timeAD.toString()}
                                onChange={handleChange}
                                placeholder="Ngay Het Hang"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="NgayHetHan">Ngày hết hạn</label>

                            <input
                                type="date"
                                name="NgayHetHan"
                                id="NgayHetHan"
                                value={formData.NgayHetHan.toString()}
                                onChange={handleChange}
                                placeholder="Ngay Het Hang"
                            />
                            <input
                                type="time"
                                name="timeHH"
                                id="timeHH"
                                value={formData.timeHH.toString()}
                                onChange={handleChange}
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
                                value={formData.GiaVe.toString()}
                                onChange={handleChange}
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
                                value={formData.GiaCombo.toString()}
                                onChange={handleChange}
                                placeholder="Giá vé"
                                disabled={!isChecked2}
                            />
                            <p>/</p>
                            <input
                                type="text"
                                name="SoveCB"
                                value={formData.SoveCB}
                                onChange={handleChange}
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
                        value={formData.TinhTrang.toString()}
                        onChange={(e) => handleChangeTT(e.target.value)}
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

export default AddHomeTicketForm;
