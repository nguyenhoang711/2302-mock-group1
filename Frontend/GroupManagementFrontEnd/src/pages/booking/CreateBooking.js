
import React, { useEffect, useState } from "react";
import './createBooking.css';
import BookingApi from '../../api/BookingApi';
import axios from "axios";
import Header from "../../components/Header";

const CreateBooking = () => {
    const [countAdult, setCountAdult] = useState(0);

    const increaseAgeAdult = () => {
        setCountAdult(countAdult + 1);
    };

    const decreaseAgeAdult = () => {
        if (countAdult > 0) {
            setCountAdult(countAdult - 1);
        }
    };

    const [countChildren, setCountChildren] = useState(0);

    const increaseAgeChildren = () => {
        setCountChildren(countChildren + 1);
    };

    const decreaseAgeChildren = () => {
        if (countChildren > 0) {
            setCountChildren(countChildren - 1);
        }
    };

    const [countSmallChildren, setCountSmallChildren] = useState(0);

    const increaseAgeSmallChildren = () => {
        setCountSmallChildren(countSmallChildren + 1);
    };

    const decreaseAgeSmallChildren = () => {
        if (countSmallChildren > 0) {
            setCountSmallChildren(countSmallChildren - 1);
        }
    };

    const [countBaby, setCountBaby] = useState(0);

    const increaseAgeBaby = () => {
        setCountBaby(countBaby + 1);
    };

    const decreaseAgeBaby = () => {
        if (countBaby > 0) {
            setCountBaby(countBaby - 1);
        }
    };

    const [countTotalPeople, setCountTotalPeople] = useState(0);

    const [countTotalPrice, setCountTotalPrice] = useState(0);

    useEffect(() => {
        const totalCount = countAdult + countChildren + countSmallChildren + countBaby;
        setCountTotalPeople(totalCount);
    }, [countAdult, countChildren, countSmallChildren, countBaby]);

    useEffect(() => {
        const price = 790000;
        const totalPrice = countAdult * price + countChildren * price * 0.75 + countSmallChildren * price * 0.5;
        setCountTotalPrice(totalPrice);
    }, [countAdult, countChildren, countSmallChildren]);

    const handleNotesChange = () => {
        const checkboxes = document.querySelectorAll('.note-more');

        let notesCheckBox = 'Các lưu ý:\n';
        let countChecked = 0;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                countChecked++;
                notesCheckBox += '  - ' + checkbox.value + '\n';
            }
        });

        if (countChecked == 0) {
            notesCheckBox = "Các lưu ý: Không có\n";
        }

        let moreNote = '';
        const getMoreNote = document.getElementById('note').value;
        if (getMoreNote == '') {
            moreNote = "Ghi chú thêm: Không có";
        }
        else {
            moreNote += "Ghi chú thêm: \n  - " + getMoreNote;
        }

        let notes = notesCheckBox + moreNote;

        return notes;
    }


    const getUserByEmail = async () => {
        const email = document.getElementById('email').value;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/findByEmail/${email}`);
            const user = response.data;
            const userId = user.id;
            return userId;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };



    const createBooking = async () => {
        const uId = await getUserByEmail();
        const notes = handleNotesChange();
        let data = {
            tripId: 1,
            userId: uId,
            numOfPeople: countTotalPeople,
            totalPrice: countTotalPrice,
            details: notes
        }
        axios.post("http://localhost:8080/api/v1/bookings", data)
            .then(function (response) {
                alert("Đặt tour thành công")
            })
            .catch(function (error) {
                alert("Đặt tour thất bại");
            });
    }


    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Page</title>
            <link rel="stylesheet" href="createBooking.css" />
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
            <div className="booking-container">
                <Header></Header>
                <div className="checkout-head">
                    <div className="checkout-head-container">
                        <div className="row">
                            <ul className="head col-12">
                                <li className="checked">1. Nhập thông tin</li>
                                <li className="checked">
                                    <i className="fal fa-angle-right" />
                                </li>
                                <li>2. Thanh toán</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="card-trip">
                        <img src='./img/DaLat_tour.jpg' alt="Ảnh" />
                        <div className="card-content">
                            <div className="card-content-title">
                                <span>
                                    City Đà Lạt - Săn mây đón bình minh - Thưởng thức Trà Long Đình
                                </span>
                            </div>
                            <div className="card-content-details">
                                <p>
                                    <span>Mã tour: </span>
                                    <span>DSDLO001-012-240623XE</span>
                                </p>
                                <p>
                                    <span>Khởi hành: </span>
                                    <span>24/06/2023</span>
                                </p>
                                <p>
                                    <span>Thời gian: </span>
                                    <span>1 ngày</span>
                                </p>
                                <p>
                                    <span>Nơi khởi hành: </span>
                                    <span>Đà Lạt</span>
                                </p>
                                <p>
                                    <span>Số chỗ còn nhận: </span>
                                    <span>5</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="overview-container">
                        <div className="overview-trip">
                            <h2>Tổng quan về chuyến đi</h2>
                            <div className="user-contact">
                                <h3>Thông tin liên lạc</h3>
                                <div className="form-contact">
                                    <form action="#">
                                        <div className="name form-element">
                                            <label>
                                                Họ và Tên <b>*</b>
                                            </label>
                                            <input
                                                className="form-control"
                                                id="contact_name"
                                                name="Fullname"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="mail form-element">
                                            <label>
                                                Email <b>*</b>
                                            </label>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="Email"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="phone form-element">
                                            <label>
                                                Số điện thoại <b>*</b>
                                            </label>
                                            <input
                                                className="form-control"
                                                id="mobilephone"
                                                name="Telephone"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="addess form-element">
                                            <label>Địa chỉ</label>
                                            <input
                                                className="form-control"
                                                id="address"
                                                name="Address"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="passenger-info">
                                <h3>Hành khách</h3>
                                <div className="passenger-container">
                                    <div className="change">
                                        <div className="change-title">
                                            <h4>Người lớn</h4>
                                            <p>&gt; 12 tuổi</p>
                                        </div>
                                        <div className="change-number">
                                            <span onClick={() => { decreaseAgeAdult(); }}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="adult">
                                                {countAdult}
                                            </span>
                                            <span onClick={() => { increaseAgeAdult(); }}>
                                                <i className="fal fa-plus-circle" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="change">
                                        <div className="change-title">
                                            <h4>Trẻ em</h4>
                                            <p>Từ 5-11 tuổi</p>
                                        </div>
                                        <div className="change-number">
                                            <span onClick={() => { decreaseAgeChildren(); }}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="children">
                                                {countChildren}
                                            </span>
                                            <span onClick={() => { increaseAgeChildren(); }}>
                                                <i className="fal fa-plus-circle" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="change">
                                        <div className="change-title">
                                            <h4>Trẻ nhỏ</h4>
                                            <p>Từ 2-4 tuổi</p>
                                        </div>
                                        <div className="change-number">
                                            <span onClick={() => { decreaseAgeSmallChildren(); }}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="smallchildren">
                                                {countSmallChildren}
                                            </span>
                                            <span onClick={() => { increaseAgeSmallChildren(); }}>
                                                <i className="fal fa-plus-circle" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="change">
                                        <div className="change-title">
                                            <h4>Em bé</h4>
                                            <p>Từ 0-2 tuổi</p>
                                        </div>
                                        <div className="change-number">
                                            <span onClick={() => { decreaseAgeBaby(); }}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="baby">
                                                {countBaby}
                                            </span>
                                            <span onClick={() => { increaseAgeBaby(); }}>
                                                <i className="fal fa-plus-circle" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="passenger-notice">
                                    <div className="passenger-notice-left">
                                        . Người lớn sinh trước ngày <b>22/06/2011</b>
                                        <br /> <br />. Trẻ nhỏ sinh từ <b>23/06/2018</b> đến{" "}
                                        <b>22/06/2021</b>
                                    </div>
                                    <div className="passenger-notice-right">
                                        . Trẻ em sinh từ <b>23/06/2011</b> đến <b>22/06/2018</b>
                                        <br /> <br />. Em bé sinh từ <b>23/06/2021</b> đến{" "}
                                        <b>24/06/2023</b>
                                    </div>
                                </div>
                            </div>
                            <div className="passenger-note">
                                <h3>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi !</h3>
                                <div className="passenger-note-inner">
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Hút thuốc"
                                        />
                                        <span>Hút thuốc</span>
                                    </label>
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Phòng tầng cao"
                                        />
                                        <span>Phòng tầng cao</span>
                                    </label>
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Trẻ em hiếu động"
                                        />
                                        <span>Trẻ em hiếu động</span>
                                    </label>
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Ăn chay"
                                        />
                                        <span>Ăn chay</span>
                                    </label>
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Có người khuyết tật"
                                        />
                                        <span>Có người khuyết tật</span>
                                    </label>
                                    <label className="checker">
                                        <input
                                            type="checkbox"
                                            className="note-more"
                                            defaultValue="Phụ nữ có thai"
                                        />
                                        <span>Phụ nữ có thai</span>
                                    </label>
                                    <div className="more-note">
                                        <p>Ghi chú thêm</p>
                                        <textarea
                                            cols={20}
                                            rows={5}
                                            id="note"
                                            name="note"
                                            placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
                                            defaultValue={"                            "}
                                        />
                                    </div>
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
                                        onClick="javascript:window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=375,height=667');return false;"
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
                                    Tour trọn gói <span> (5 khách)</span>
                                </p>
                                <div className="product">
                                    <div className="product-image">
                                        <img src="./img/DaLat_tour.jpg" alt="image" />
                                    </div>
                                    <div className="product-content">
                                        <p className="product-title">
                                            City Đà Lạt - Săn mây đón bình minh - Thưởng thức Trà Long
                                            Đình
                                        </p>
                                    </div>
                                </div>
                                <div className="go-tour">
                                    <div className="start">
                                        <i className="fal fa-calendar-minus" />
                                        <div className="start-content">
                                            <h4>Bắt đầu chuyến đi</h4>
                                            <p className="time">T7, 24 Tháng 6, 2023</p>
                                            <p className="from" />
                                        </div>
                                    </div>
                                    <div className="end">
                                        <i className="fal fa-calendar-minus" />
                                        <div className="start-content">
                                            <h4>Kết thúc chuyến đi</h4>
                                            <p className="time">T7, 24 Tháng 6, 2023</p>
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
                                                    {countAdult} x 790,000₫
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Trẻ em</td>
                                                <td className="t-price text-right" id="ChildrenPrice">
                                                    {countChildren} x 592,500₫
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Trẻ nhỏ</td>
                                                <td className="t-price text-right" id="SmallChildrenPrice">
                                                    {countSmallChildren} x 395,000₫
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Em bé</td>
                                                <td className="t-price text-right" id="BabyPrice">
                                                    0₫
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
                                                    {countTotalPrice.toLocaleString("en-US")}đ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-order"
                                            style={{ width: "100%" }}
                                            onClick={() => createBooking()}
                                        >
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

window.onload = (event) => {
    var textarea = document.getElementById('note');
    textarea.value = textarea.value.replace(/^\s*|\s*$/g, '');
}

export default CreateBooking;