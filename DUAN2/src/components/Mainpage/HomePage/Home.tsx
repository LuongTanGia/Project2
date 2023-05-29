import React, { useState } from "react";
import LineChart from "../utils/chart/LineChart";
import DoChart from "../utils/chart/DoughnutChart";
import DoChart2 from "../utils/chart/DoughnutChart2";
import "./home.css";
import { DatePicker, Space } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
    const [picker, setPicker] = useState<
        "date" | "time" | "month" | "week" | "quarter" | "year" | undefined
    >("date");
    const onChange = (date: any, dateString: any) => {
        console.log(date, dateString);
        toast.info(`Selected date: ${dateString}`);
    };
    return (
        <div className="HomeBox">
            <div className="homePage">
                <h1 className="title">Thống kê</h1>
                <div className="LineChart">
                    <div className="LineChart_desc">
                        <p className="desc">Thống kê</p>
                        <div className="date_box">
                            <DatePicker onChange={onChange} picker={picker} />
                        </div>
                    </div>
                    <LineChart />
                </div>
                <div className="DoughChart">
                    <div className="TotalBox">
                        <p className="desc">Tổng doanh thu theo tuần</p>
                        <p className="totalPrice">
                            525.145.000<span>đồng</span>
                        </p>
                        <div className="date_box">
                            <DatePicker onChange={onChange} picker={picker} />
                        </div>
                    </div>
                    <div className="DoughChart_box">
                        <p className="chartDesc">Gói gia đình</p>
                        <DoChart />
                    </div>
                    <div className="DoughChart_box">
                        <p className="chartDesc">Gói sự kiện</p>
                        <DoChart2 />
                    </div>
                    <div className="DescChart">
                        <div className="On">Vé đã sử dụng</div>
                        <div className="Off">Vé chưa sử dụng</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
