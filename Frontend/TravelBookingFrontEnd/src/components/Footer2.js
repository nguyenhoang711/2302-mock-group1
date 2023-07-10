import React from "react";

const Footer2 = () => {
    return (
        <div className="footer" style={{padding: "20px 100px", backgroundColor: "#f4f4f4"}}>
            <p style={{lineHeight: "24px"}}>
                Bản quyền của Vietravel ® 2016. Bảo lưu mọi quyền.
                <br />
                Ghi rõ nguồn "
                <a
                    href="https://travel.com.vn"
                    name="travel"
                    title="travel"
                    style={{ color: "black" }}
                >
                    www.travel.com.vn
                </a>
                " ® khi sử dụng lại thông tin từ website này.
                <br />
                Số giấy phép kinh doanh lữ hành Quốc tế: 79-234/2014/TCDL-GP LHQT
            </p>
        </div>

    )
}

export default Footer2;