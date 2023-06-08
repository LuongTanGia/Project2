import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { database } from "../firebase/firebase";
import { ref, child, get, update, set } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

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

interface TicketState {
    data: Ticket[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
}

const initialState: TicketState = {
    data: [],
    loading: false,
    error: null,
    searchTerm: "",
};

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        fetchTicketsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTicketsSuccess(state, action: PayloadAction<Ticket[]>) {
            state.data = action.payload;
            state.loading = false;
        },
        fetchTicketsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.loading = false;
            state.searchTerm = action.payload;
        },
        updateTicketStart(state) {
            state.loading = true;
            state.error = null;
        },

        updateTicketSuccess(state) {
            state.loading = false;
        },

        updateTicketFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateTicketData(state, action: PayloadAction<Ticket>) {
            const { id, ...updatedData } = action.payload;
            const ticketIndex = state.data.findIndex(
                (ticket) => ticket.id === id
            );
            if (ticketIndex !== -1) {
                state.data[ticketIndex] = {
                    ...state.data[ticketIndex],
                    ...updatedData,
                };
            }
        },
    },
});

export const {
    fetchTicketsStart,
    fetchTicketsSuccess,
    fetchTicketsFailure,
    setSearchTerm,
    updateTicketData,
    updateTicketSuccess,
    updateTicketFailure,
    updateTicketStart,
} = ticketSlice.actions;

export default ticketSlice.reducer;

export const searchTickets =
    (id: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch(fetchTicketsStart());

        try {
            const { searchTerm } = getState().ticket; // Lấy giá trị searchTerm từ state
            const dbRef = ref(database);

            const snapshot = await get(child(dbRef, `${id}/Listve`));

            if (snapshot.exists()) {
                const ticket = snapshot.val();
                const ticketList: Ticket[] = Object.keys(ticket)
                    .map((ticketID) => ({
                        id: ticketID,
                        ...ticket[ticketID],
                    }))
                    .filter((ticket) => {
                        // Kiểm tra từ khóa tìm kiếm trong các trường
                        const {
                            Bookingcode,
                            CongCheckIn,
                            NgaySuDung,
                            NgayXuatVe,
                            Sove,
                            TenSuKien,
                            TrangThai,
                            TinhTrang,
                            LoaiVe,
                        } = ticket;

                        const searchTermLowerCase = searchTerm.toLowerCase();

                        return (
                            Bookingcode.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            CongCheckIn.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            NgaySuDung.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            NgayXuatVe.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            Sove.toLowerCase().includes(searchTermLowerCase) ||
                            TenSuKien.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            TrangThai.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            TinhTrang.toLowerCase().includes(
                                searchTermLowerCase
                            ) ||
                            LoaiVe.toLowerCase().includes(searchTermLowerCase)
                        );
                    });

                dispatch(fetchTicketsSuccess(ticketList));
                {
                    ticketList.length > 0
                        ? toast.success("Lấy dữ liệu thành công!")
                        : toast.warn("Không có dữ liệu!");
                }
            } else {
                dispatch(fetchTicketsFailure("No data available"));
                toast.warn("Không có dữ liệu!");
            }
        } catch (error: any) {
            dispatch(fetchTicketsFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };
export const updateTicket =
    (ticketData: Ticket, idTicket: string): AppThunk =>
    async (dispatch) => {
        dispatch(updateTicketStart());

        try {
            const { id, ...data } = ticketData;
            await update(ref(database, `${idTicket}/${id}`), data);

            dispatch(updateTicketData(ticketData));
            dispatch(updateTicketSuccess());
            toast.info(`Cập nhật thành công! Code:${ticketData.Bookingcode} `);
        } catch (error: any) {
            dispatch(updateTicketFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };

export const updateTinhTrangForAllItems =
    (updatedTinhTrang: string, id: string): AppThunk =>
    async (dispatch) => {
        dispatch(updateTicketStart());

        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `${id}/Listve`));

            if (snapshot.exists()) {
                const data = snapshot.val();
                const updates: any = {};

                Object.keys(data).forEach((itemId) => {
                    updates[`${id}/Listve/${itemId}/TinhTrang`] =
                        updatedTinhTrang;
                });

                await update(dbRef, updates);

                Object.keys(data).forEach((itemId) => {
                    const updatedTicketData = {
                        id: itemId,
                        ...data[itemId],
                        TrangThai: updatedTinhTrang,
                    };
                    dispatch(updateTicketData(updatedTicketData));
                });

                dispatch(updateTicketSuccess());
                window.location.reload();
                toast.success("Cập nhật trạng thái thành công!");
            } else {
                toast.warn("Không có dữ liệu!");
            }
        } catch (error: any) {
            dispatch(updateTicketFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };
