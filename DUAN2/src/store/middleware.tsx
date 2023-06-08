import { database } from "../firebase/firebase";
import { ref, child, get, update, set, push } from "firebase/database";

const addTicketToFirebase = () => {
    const newData = {
        Bookingcode: "ALT20210501GD",
        CongCheckIn: "Cổng 4",
        LoaiVe: "Vé cổng",
        NgaySuDung: "10/05/2023",
        NgayXuatVe: "14/04/2021",
        Sove: "156464891479",
        TenSuKien: "Hội chợ triển lãm tiêu dùng 2022",
        TinhTrang: "Chưa đối soát",
        TrangThai: "Het",

        // Các trường dữ liệu khác bạn muốn thêm
    };
    // ID của ticket bạn tự định nghĩa

    // Đường dẫn đến node cần thêm dữ liệu
    const ticketRef = ref(database, "-NXJt4EOtrvxWqz_W1Jr/Listve");

    push(ticketRef, newData)
        .then(() => {
            console.log("Dữ liệu đã được thêm vào thành công");
        })
        .catch((error) => {
            console.log("Lỗi khi thêm dữ liệu:", error);
        });
};

const MyComponent = () => {
    // ...
    return (
        <div>
            {/* Các phần tử JSX khác trong component */}
            <button onClick={addTicketToFirebase}>Thêm dữ liệu</button>
        </div>
    );
};

export default MyComponent;
