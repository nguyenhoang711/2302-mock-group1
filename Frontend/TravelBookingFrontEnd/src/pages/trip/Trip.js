import React, { useEffect, useState } from "react";

const Trip = () => {

    const handleLinkClick = (tripId) => {
        window.location.href = `http://localhost:3000/createBooking?tripId=${tripId}`;
    };
    return (
        <div>
            <h1 style={{ cursor: "pointer" }}>Đà Nẵng - Huế - Đầm Lập An - La Vang - Động Phong Nha & Thiên Đường - KDL Bà Nà - Cầu Vàng -Sơn Trà - Hội An - Đà Nẵng</h1>
            <button onClick={() => handleLinkClick('1')}>Đặt ngay</button>
            <br /> <br />
            <h1 style={{ cursor: "pointer" }} onClick={() => handleLinkClick('2')}>Đà Lạt - Thác Bobla - KDL Cao Nguyên Hoa - Trang Trại rau và hoa Vạn Thành</h1>
            <button onClick={() => handleLinkClick('2')}>Đặt ngay</button>
            <hr />
        </div>
    )
}

export default Trip;