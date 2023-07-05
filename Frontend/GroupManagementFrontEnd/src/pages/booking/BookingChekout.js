import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

import "./bookingCheckout.css"
import Header from "../../components/Header";

const convertDateToString = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.format('DD/MM/YYYY');
    } else {
        return 'Invalid Date';
    }
};

const getValueFromURLParam = (paramName) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(paramName);
};


const BookingCheckout = () => {

    const tourName = useSelector((state) => state.CreateBooking.tripInfo.tourName);
    const tourImg = useSelector((state) => state.CreateBooking.tripInfo.tourImg);
    const numOfPeople = useSelector((state) => state.CreateBooking.tripInfo.numOfPeople);
    const startDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.startDate));
    const endDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.endDate));
    const priceTour = useSelector((state) => state.CreateBooking.tripInfo.priceTour);

    const countAdult = localStorage.getItem('countAdult');
    const countChildren = localStorage.getItem('countChildren');
    const countSmallChildren = localStorage.getItem('countSmallChildren');
    const countBaby = localStorage.getItem('countBaby');
    const countTotalPeople = localStorage.getItem('countTotalPeople');
    const countTotalPrice = localStorage.getItem('countTotalPrice');


    const handleOnClickBookingButton = () => {
        let bookingId = getValueFromURLParam('bookingId');
        const vnpayBtn = document.getElementById('vnpayRb');
        const payBtns = document.getElementsByName('payment-item-check');
        const checkbox = document.getElementById("checkbox-accept");
        let count = 0;
        for (let i = 0; i < payBtns.length; i++) {
            if (payBtns[i].checked)
                count++;
        }
        if (count == 0) {
            alert("Vui lòng chọn 1 phương thức thanh toán");
        }
        else if(!checkbox.checked){
            alert("Vui lòng đồng ý với các điều khoản");
        }
        else if (vnpayBtn.checked) {
            window.location.replace(`http://localhost:3000/showCustomerInfo?bookingId=${bookingId}&totalPrice=${countTotalPrice}`);
        }
        else {
            alert("Tính năng đang phát triển");
        }
    }


    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Checkout</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                crossOrigin="anonymous"
            />
            <Header />
            <div className="container2">
                <div className="overview-container">
                    <div className="payment">
                        <h2>Thanh toán</h2>
                        <div className="payment-type">
                            <h3>Các hình thức thanh toán</h3>
                            <div className="payment-item-container">
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="far fa-money-bill" />
                                        <span>Tiền mặt</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fab fa-cc-mastercard" />
                                        <span>Thẻ tín dụng</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fas fa-university" />
                                        <span>Chuyển khoản</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="far fa-credit-card-front" />
                                        <span>ATM / Internet Banking</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fas fa-qrcode" />
                                        <span>Thanh toán VNPAY</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" id="vnpayRb" name="payment-item-check" defaultChecked="true"/>
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fas fa-university" />
                                        <span>Thanh toán ZaloPay</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fas fa-qrcode" />
                                        <span>Thanh toán bằng Momo</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                                <div className="payment-item">
                                    <div className="payment-item-title">
                                        <i className="fas fa-qrcode" />
                                        <span>Thanh toán bằng ShopeePay</span>
                                    </div>
                                    <div className="payment-item-check">
                                        <input type="radio" name="payment-item-check" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="terms">
                            <h3>Điều khoản bắt buộc khi đăng ký online</h3>
                            <div id="term" className="scrollable-content">
                                <p className="term-header">NỘI DUNG ĐỌC, HIỂU VÀ ĐỒNG Ý TRƯỚC KHI ĐĂNG KÝ ONLINE CHƯƠNG TRÌNH DU LỊCH TRONG NƯỚC</p>
                                <p className="term-title">
                                    Tôi đã hiểu rõ và đồng ý với các nội dung liên quan đến chương trình tour trong giai đoạn bình thường mới và điều kiện bán tour như sau:
                                </p>
                                <p className="term-content">
                                    1. Trường hợp tour di chuyển bằng xe/tàu hỏa/tàu thủy thì Khách phải đảm bảo đã hoàn thành tiêm 02 mũi vắc xin và có giấy xác nhận tiêm chủng (mũi thứ 02 từ 14 ngày trở lên và không quá 12 tháng) hoặc F0 đã khỏi bệnh COVID-19 trong vòng 06 tháng có giấy xác nhận của bệnh viện tính đến thời điểm đi du lịch. Theo chính sách của cơ quan nhà nước, địa phương nơi điểm đi, điểm đến, các điều kiện trên có thể thay đổi tùy từng thời điểm cụ thể và Vietravel sẽ thông báo cho Khách hàng để bổ sung theo yêu cầu.
                                </p>
                                <p className="term-content">
                                    2. Trẻ em (đi cùng ba mẹ) phải xét nghiệm COVID-19 và có giấy xác nhận âm tính của cơ sở Y tế trước ngày khởi hành 24h (chi phí xét nghiệm tự túc).
                                </p>
                                <p className="term-content">
                                    3. Thông tin kiểm soát dịch bệnh tại các địa phương sẽ thay đổi và Vietravel sẽ cập nhật phương án phòng chống dịch thường xuyên đến khách hàng (nếu có).
                                </p>
                                <p className="term-content">
                                    4. Khách hàng sẽ phối hợp cùng Vietravel thực hiện đúng theo hướng dẫn phòng chống dịch hoặc các biện pháp cách ly theo chỉ đạo từ địa phương - nếu có với chi phí tự túc.
                                </p>
                                <p className="term-title">
                                    I. GIÁ VÉ DU LỊCH
                                </p>
                                <p className="term-content">
                                    Giá vé du lịch được tính theo tiền Đồng (Việt Nam - VNĐ). Trường hợp khách thanh toán bằng USD sẽ được quy đổi ra VNĐ theo tỉ giá của ngân hàng Đầu Tư và Phát Triển Việt Nam - Chi nhánh TP.HCM tại thời điểm thanh toán.
                                </p>
                                <p className="term-content">
                                    Giá vé chỉ bao gồm những khoản được liệt kê một cách rõ ràng trong phần “Bao gồm” trong các chương trình du lịch. Vietravel không có nghĩa vụ thanh toán bất cứ chi phí nào không nằm trong phần “Bao gồm”.
                                </p>
                                <p className="term-title">
                                    II. GIÁ DÀNH CHO TRẺ EM
                                </p>
                                <p className="term-content">
                                    - Trẻ em dưới 5 tuổi:  không thu phí dịch vụ, bố mẹ tự lo cho bé và thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em thứ 2 sẽ đóng phí theo qui định dành cho độ tuổi từ 5 đến dưới 12 tuổi và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công cộng mua vé theo qui định của các đơn vị vận chuyển (nếu có)
                                </p>
                                <p className="term-content">
                                    - Trẻ em từ 5 tuổi đến dưới 12 tuổi:  50% giá tour người lớn đối với tuyến xe, 75% giá tour người lớn đối với tuyến có vé máy bay (không có chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới 12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn.
                                </p>
                                <p className="term-content">
                                    - Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn.
                                </p>
                                <p className="term-title">
                                    III. THANH TOÁN
                                </p>
                                <p className="term-content">
                                    Khi thanh toán, Quý khách vui lòng cung cấp đầy đủ thông tin và đặt cọc ít nhất 50% tổng số tiền tour để giữ chỗ.
                                </p>
                                <p className="term-content">
                                    Thanh toán bằng tiền mặt hoặc chuyển khoản tới tài khoản ngân hàng của Vietravel.
                                </p>
                                <p className="term-content">
                                    Việc thanh toán được xem là hoàn tất khi Vietravel nhận được đủ tiền vé du lịch trước lúc khởi hành hoặc theo hợp đồng thỏa thuận giữa hai bên. Bất kỳ sự thanh toán chậm trễ dẫn đến việc hủy dịch vụ không thuộc trách nhiệm của Vietravel.
                                </p>
                                <p className="term-content">
                                    Khách hàng có nhu cầu xuất hóa đơn, vui lòng cung cấp thông tin xuất hóa đơn ngay tại thời điểm đăng ký. Vietravel có trách nhiệm xuất hóa đơn cho khách hàng trong vòng 07 ngày sau khi tour kết thúc.
                                </p>
                                <p className="term-content">
                                    Khi thực hiện việc chuyển khoản, Quý khách vui lòng ghi rõ tên họ, số điện thoại và nội dung chuyển khoản cho chương trình du lịch cụ thể đã được Quý khách chọn đăng ký.
                                </p>
                                <p className="term-content">
                                    Sau khi thực hiện việc chuyển khoản, Quý khách vui lòng gửi ủy nhiệm chi về Công ty Vietravel theo địa chỉ email sales@vietravel.com và liên hệ với nhân viên phụ trách tuyến để nhận được Vé du lịch chính thức từ Công ty Vietravel.
                                </p>
                                <p className="term-content">
                                    *Lưu ý: Quý khách vui lòng điền đầy đủ thông tin theo yêu cầu khi đăng ký tour qua mạng bán travel.com.vn và chịu trách nhiệm về tính chính xác của những thông tin đã cung cấp. Vietravel sẽ sử dụng những thông tin này để cung cấp cho các đối tác dịch vụ và tiến hành các thủ tục cần thiết cho chuyến đi. Nếu có sự khác biệt giữa thông tin mà Quý khách cung cấp so với thực tế dẫn đến việc phải điều chỉnh thì Quý khách vui lòng thanh toán các khoản chi phí phát sinh (nếu có).
                                </p>
                            </div>
                            <div className="conditions-accept">
                                <input type="checkbox" id="checkbox-accept"></input>
                                <label htmlFor="checkbox-accept">Tôi đồng ý với các điều kiện trên</label>
                            </div>
                        </div>
                    </div>
                    <div className="group-checkout">
                        <div className="box-support">
                            <label>Quý khách cần hỗ trợ?</label>
                            <div className="group-contact">
                                <a
                                    href="https://webcall.talking.vn/frame-click-to-call/new?code=tCEZl1-MKPuA6JU-czVAScCb0pPkHmPt"
                                    className="phone"
                                    // onclick="javascript:window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=375,height=667');return false;"
                                    target="_blank"
                                >
                                    <i className="fal fa-phone-alt" />
                                    <p>
                                        Gọi miễn phí <br />
                                        qua internet
                                    </p>
                                </a>
                                <a
                                    href="mailto:info@vietravel.com"
                                    className="mail"
                                    data-toggle="modal"
                                    data-target="#divTuVan"
                                    style={{ cursor: "pointer" }}
                                >
                                    <i className="fal fa-envelope" />
                                    <p>
                                        Gửi yêu cầu <br />
                                        hỗ trợ ngay
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div className="group-checkout-container">
                            <h3>Tóm tắt chuyến đi</h3>
                            <p className="package-title">
                                Tour trọn gói <span> ({numOfPeople} khách)</span>
                            </p>
                            <div className="product">
                                <div className="product-image">
                                    <img src={`./img/${tourImg}`} alt="image" />
                                </div>
                                <div className="product-content">
                                    <p className="product-title">
                                        {tourName}
                                    </p>
                                </div>
                            </div>
                            <div className="go-tour">
                                <div className="start">
                                    <i className="fal fa-calendar-minus" />
                                    <div className="start-content">
                                        <h4>Bắt đầu chuyến đi</h4>
                                        <p className="time">{startDate}</p>
                                        <p className="from" />
                                    </div>
                                </div>
                                <div className="end">
                                    <i className="fal fa-calendar-minus" />
                                    <div className="start-content">
                                        <h4>Kết thúc chuyến đi</h4>
                                        <p className="time">{endDate}</p>
                                        <p className="from" />
                                    </div>
                                </div>
                            </div>
                            <div className="detail">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="l1">Hành khách</th>
                                            <th className="l2 text-right">
                                                <i className="fal fa-users" id="AmoutPerson">
                                                    {countTotalPeople} người
                                                </i>
                                                <p className="add-more">
                                                    {countAdult} người lớn
                                                    <br />{countChildren} trẻ em
                                                    <br />{countSmallChildren} trẻ nhỏ
                                                    <br />{countBaby} em bé
                                                </p>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>Người lớn</td>
                                            <td className="t-price text-right" id="AdultPrice">
                                                {countAdult} x {priceTour.toLocaleString("en-US")}₫
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Trẻ em</td>
                                            <td className="t-price text-right" id="ChildrenPrice">
                                                {countChildren} x {(priceTour * 0.75).toLocaleString("en-US")}₫
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Trẻ nhỏ</td>
                                            <td className="t-price text-right" id="SmallChildrenPrice">
                                                {countSmallChildren} x {(priceTour * 0.5).toLocaleString("en-US")}₫
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Em bé</td>
                                            <td className="t-price text-right" id="BabyPrice">
                                                {countBaby} x0₫
                                            </td>
                                        </tr>
                                        <tr className="pt">
                                            <td>Phụ thu phòng riêng</td>
                                            <td className="t-price text-right" id="txtPhuThu">
                                                0₫
                                            </td>
                                        </tr>
                                        <tr className="cuppon">
                                            <td>Mã giảm giá </td>
                                            <td className="cp-form text-right">
                                                <form action="#">
                                                    <input
                                                        className="form-control"
                                                        id="DiscountCode"
                                                        name="DiscountCode"
                                                        placeholder="Thêm mã"
                                                        required="required"
                                                        type="text"
                                                        defaultValue=""
                                                    />
                                                    <input
                                                        type="button"
                                                        id="btnDiscountCode"
                                                        defaultValue="Áp dụng"
                                                    />
                                                </form>
                                            </td>
                                        </tr>
                                        <tr className="total">
                                            <td>Tổng cộng</td>
                                            <td className="t-price text-right" id="TotalPrice">
                                                {parseInt(countTotalPrice).toLocaleString("en-US")}₫
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <button
                                        className="btn btn-primary btn-order"
                                        style={{ width: "100%" }}
                                        onClick={() => handleOnClickBookingButton()}
                                    >
                                        Đặt ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingCheckout;