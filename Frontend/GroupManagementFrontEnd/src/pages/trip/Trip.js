import React, { useEffect, useState }  from "react";
import { useHistory } from 'react-router-dom';

const Trip = () => {

    const handleLinkClick = (tripId) => {
            window.location = `http://localhost:3000/createBooking?tripId=${tripId}`;
      };
    return (
        <>
        <h1 style={{ cursor: "pointer" }}>City Đà Lạt - Săn mây đón bình minh - Thưởng thức Trà Long Đình</h1>
            <button onClick={() => handleLinkClick('1')}>Đặt ngay</button>
            <br /> <br />
            <h1 style={{ cursor: "pointer" }} onClick={() => handleLinkClick('2')}>KDL Bà Nà – Sơn Trà – Hội An - La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế</h1>
            <button onClick={() => handleLinkClick('2')}>Đặt ngay</button>
            <hr />
        </>
    )
}

export default Trip;