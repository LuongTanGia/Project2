import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Ticket {
    id: string;
    Bookingcode: string;
    CongCheckIn: string;
    NgaySuDung: string;
    NgayXuatVe: string;
    Sove: string;
    TenSuKien: string;
    TrangThai: string;
}

interface TicketState {
    data: Ticket[];
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    data: [],
    loading: false,
    error: null,
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
    },
});

export const { fetchTicketsStart, fetchTicketsSuccess, fetchTicketsFailure } =
    ticketSlice.actions;

export default ticketSlice.reducer;

export const fetchTickets = (): AppThunk => async (dispatch) => {
    dispatch(fetchTicketsStart());

    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "Tickets"));

        if (snapshot.exists()) {
            const ticket = snapshot.val();
            const ticketList: Ticket[] = Object.keys(ticket).map(
                (ticketID) => ({
                    id: ticketID,
                    ...ticket[ticketID],
                })
            );

            dispatch(fetchTicketsSuccess(ticketList));
            toast.success("Lấy dữ liệu thành công!");
        } else {
            dispatch(fetchTicketsFailure("No data available"));
            toast.warn("Không có dữ liệu!");
        }
    } catch (error: any) {
        dispatch(fetchTicketsFailure(error.message));
        toast.error(`Lỗi: ${error.message}`);
    }
};
