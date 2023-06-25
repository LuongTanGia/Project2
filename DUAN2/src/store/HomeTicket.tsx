import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { database } from "../firebase/firebase";
import { ref, child, get, update, set, push } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export interface HomeTicket {
    id: string;
    GiaCombo: string;
    GiaVe: string;
    MaGoi: string;
    NgayApDung: string;
    NgayHetHan: string;
    TenGoi: string;
    SoveCB: number;
    TinhTrang: string;
    timeAD: string;
    timeHH: string;
    Listve: {
        Bookingcode: string;
        CongCheckIn: string;
        LoaiVe: string;
        NgaySuDung: string;
        NgayXuatVe: string;
        Sove: string;
        TenSuKien: string;
        TinhTrang: string;
        TrangThai: string;
    }[];
    TenSuKien: string;
}
interface CreateHomeTicket {
    GiaCombo: string;
    GiaVe: string;
    MaGoi: string;
    NgayApDung: string;
    NgayHetHan: string;
    TenGoi: string;
    TinhTrang: string;
    SoveCB: number;
    Listve: {
        Bookingcode: string;
        CongCheckIn: string;
        LoaiVe: string;
        NgaySuDung: string;
        NgayXuatVe: string;
        Sove: string;
        TenSuKien: string;
        TinhTrang: string;
        TrangThai: string;
    }[];
    timeAD: string;
    timeHH: string;
    TenSuKien: string;
}
interface HomeTicketState {
    HomeData: HomeTicket[];
    dataCreated: CreateHomeTicket[];
    loading: boolean;
    error: string | null;
    searchHomeTerm: string;
}

const initialState: HomeTicketState = {
    HomeData: [],
    dataCreated: [],
    loading: false,
    error: null,
    searchHomeTerm: "",
};

const HometicketSlice = createSlice({
    name: "Hometicket",
    initialState,
    reducers: {
        fetchHomeTicketsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchHomeTicketsSuccess(
            state,
            action: PayloadAction<HomeTicket[] | undefined>
        ) {
            state.HomeData = action.payload || [];
            state.loading = false;
        },
        fetchHomeTicketsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setSearchHomeTerm(state, action: PayloadAction<string>) {
            state.loading = false;
            state.searchHomeTerm = action.payload;
        },
        createHomeTicketStart(state) {
            state.loading = true;
            state.error = null;
        },

        createHomeTicketSuccess(state) {
            state.loading = false;
        },

        createHomeTicketFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        createHomeTicketData(state, action: PayloadAction<CreateHomeTicket>) {
            state.dataCreated.push(action.payload);
        },
        editHomeTicketStart(state) {
            state.loading = true;
            state.error = null;
        },

        editHomeTicketSuccess(state) {
            state.loading = false;
        },

        editHomeTicketFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        editHomeTicketData(state, action: PayloadAction<HomeTicket>) {
            const { id, ...updatedTicket } = action.payload;
            const index = state.HomeData.findIndex(
                (ticket) => ticket.id === id
            );

            if (index !== -1) {
                state.HomeData[index] = {
                    ...state.HomeData[index],
                    ...updatedTicket,
                };
            }
        },
    },
});

export const {
    fetchHomeTicketsStart,
    fetchHomeTicketsSuccess,
    fetchHomeTicketsFailure,
    setSearchHomeTerm,
    createHomeTicketStart,
    createHomeTicketSuccess,
    createHomeTicketFailure,
    createHomeTicketData,
    editHomeTicketStart,
    editHomeTicketSuccess,
    editHomeTicketFailure,
    editHomeTicketData,
} = HometicketSlice.actions;

export default HometicketSlice.reducer;

export const searchHomeTickets = (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchHomeTicketsStart());

    try {
        const { searchHomeTerm } = getState().hometicket;

        const dbRef = ref(database);

        const snapshot = await get(child(dbRef, "/"));

        if (snapshot.exists()) {
            const ticket = snapshot.val();
            const ticketLists: HomeTicket[] = Object.keys(ticket)
                .map((ticketID) => ({
                    id: ticketID,
                    ...ticket[ticketID],
                }))
                .filter((ticket) => {
                    const {
                        GiaCombo,
                        GiaVe,
                        MaGoi,
                        NgayApDung,
                        NgayHetHan,
                        TenGoi,
                        TinhTrang,
                    } = ticket;

                    const searchHomeTermLowerCase =
                        searchHomeTerm.toLowerCase();

                    return (
                        GiaCombo.toLowerCase().includes(
                            searchHomeTermLowerCase
                        ) ||
                        GiaVe.toLowerCase().includes(searchHomeTermLowerCase) ||
                        MaGoi.toLowerCase().includes(searchHomeTermLowerCase) ||
                        NgayApDung.toLowerCase().includes(
                            searchHomeTermLowerCase
                        ) ||
                        NgayHetHan.toLowerCase().includes(
                            searchHomeTermLowerCase
                        ) ||
                        TenGoi.toLowerCase().includes(
                            searchHomeTermLowerCase
                        ) ||
                        TinhTrang.toLowerCase().includes(
                            searchHomeTermLowerCase
                        )
                    );
                });

            dispatch(fetchHomeTicketsSuccess(ticketLists));
        } else {
            dispatch(fetchHomeTicketsFailure("No data available"));
        }
    } catch (error: any) {
        dispatch(fetchHomeTicketsFailure(error.message));
    }
};

export const createHomeTicket =
    (ticketData: CreateHomeTicket): AppThunk =>
    async (dispatch) => {
        dispatch(createHomeTicketStart());

        try {
            const newTicketRef = ref(database, "/");
            await push(newTicketRef, ticketData);

            const newTicket: CreateHomeTicket = {
                ...ticketData,
            };
            dispatch(createHomeTicketData(newTicket));
            dispatch(createHomeTicketSuccess());

            toast.success("Thêm gói vé thành công!");
            window.location.reload();
        } catch (error: any) {
            dispatch(createHomeTicketFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };

export const editHomeTicket =
    (ticketData: HomeTicket): AppThunk =>
    async (dispatch) => {
        dispatch(editHomeTicketStart());

        try {
            const { id, ...updatedTicketData } = ticketData;
            const ticketRef = ref(database, `${id}`);
            await update(ticketRef, updatedTicketData);

            dispatch(editHomeTicketSuccess());
            toast.success("Cập nhật gói vé thành công!");
            window.location.reload();
        } catch (error: any) {
            dispatch(editHomeTicketFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };
