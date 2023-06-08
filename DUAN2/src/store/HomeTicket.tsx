import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { database } from "../firebase/firebase";
import { ref, child, get, update, set } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface HomeTicket {
    id: string;
    GiaCombo: string;
    GiaVe: string;
    MaGoi: string;
    NgayApDung: string;
    NgayHetHan: string;
    TenGoi: string;
    TinhTrang: string;
}

interface HomeTicketState {
    HomeData: HomeTicket[];
    loading: boolean;
    error: string | null;
    searchHomeTerm: string;
}

const initialState: HomeTicketState = {
    HomeData: [],
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
        fetchHomeTicketsSuccess(state, action: PayloadAction<HomeTicket[]>) {
            state.HomeData = action.payload;
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
        updateHomeTicketStart(state) {
            state.loading = true;
            state.error = null;
        },

        updateHomeTicketSuccess(state) {
            state.loading = false;
        },

        updateHomeTicketFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateHomeTicketData(state, action: PayloadAction<HomeTicket>) {
            const { id, ...updatedData } = action.payload;
            const ticketIndex = state.HomeData.findIndex(
                (ticket) => ticket.id === id
            );
            if (ticketIndex !== -1) {
                state.HomeData[ticketIndex] = {
                    ...state.HomeData[ticketIndex],
                    ...updatedData,
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
    updateHomeTicketData,
    updateHomeTicketSuccess,
    updateHomeTicketFailure,
    updateHomeTicketStart,
} = HometicketSlice.actions;

export default HometicketSlice.reducer;

export const searchHomeTickets = (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchHomeTicketsStart());

    try {
        const { searchHomeTerm } = getState().hometicket; // Lấy giá trị searchTerm từ state
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
                    // Kiểm tra từ khóa tìm kiếm trong các trường
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
export const updateHomeTicket =
    (ticketData: HomeTicket): AppThunk =>
    async (dispatch) => {
        dispatch(updateHomeTicketStart());

        try {
            const { id, ...HomeData } = ticketData;
            await update(ref(database, `Tickets/${id}`), HomeData);

            dispatch(updateHomeTicketData(ticketData));
            dispatch(updateHomeTicketSuccess());
            // toast.info(`Cập nhật thành công! Code:${ticketData.Bookingcode} `);
        } catch (error: any) {
            dispatch(updateHomeTicketFailure(error.message));
            toast.error(`Lỗi: ${error.message}`);
        }
    };
