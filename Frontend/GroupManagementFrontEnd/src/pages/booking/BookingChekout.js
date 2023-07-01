import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

import "./bookingCheckout.css"
import Header from "../../components/Header";
import MyEditor from "../../components/MyEditor";

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

const API_URL = 'http://localhost:8080';
const UPLOAD_ENDPOINT = 'api/v1/files/image';

const BookingCheckout = (props) => {

    const dispatch = useDispatch();

    const tourName = useSelector((state) => state.CreateBooking.tripInfo.tourName);
    const tourImg = useSelector((state) => state.CreateBooking.tripInfo.tourImg);
    const numOfPeople = useSelector((state) => state.CreateBooking.tripInfo.numOfPeople);
    const startDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.startDate));
    const endDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.endDate));
    const duration = useSelector((state) => state.CreateBooking.tripInfo.duration);
    const startDest = useSelector((state) => state.CreateBooking.tripInfo.startDest);
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
        let count = 0;
        for (let i = 0; i < payBtns.length; i++) {
            if (payBtns[i].checked)
                count++;
        }
        if (count == 0) {
            alert("Vui lòng chọn 1 phương thức thanh toán");
        }
        else if (vnpayBtn.checked) {
            window.location.replace(`http://localhost:3000/showCustomerInfo?bookingId=${bookingId}&totalPrice=${countTotalPrice}`);
        }
        else {
            alert("Tính năng đang phát triển");
        }
    }

    function uploadAdapter(loader) {
        return {
            upload: async () => {
                try {
                    const file = await loader.file;
                    const body = new FormData();
                    body.append("image", file);
                    console.log(file);

                    const response = await axios.post(`${API_URL}/${UPLOAD_ENDPOINT}`, body);
                    const res = response.data;
                    console.log(response.data);
                    return {
                        default: `./img/${res}`
                    };
                } catch (error) {
                    throw error;
                }
            }
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        let term = document.getElementById('term');
        if (term && term.innerHTML) {
            term.innerHTML = editorData;
        }
    };


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
                                        <input type="radio" id="vnpayRb" name="payment-item-check" />
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
                        <div className="App">
                            <CKEditor
                                config={{
                                    extraPlugins: [uploadPlugin]
                                }}
                                editor={ClassicEditor}
                                data=""
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                    editor.ui.view.editable.element.style.maxWidth = "100%";
                                }}
                                // onChange={(event, editor) => {
                                //     const data = editor.getData();
                                //     // console.log({ event, editor, data });
                                // }}
                                onChange={handleEditorChange}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                    editor.ui.view.editable.element.style.maxWidth = "100%";
                                }}
                            />
                        </div>
                        <div className="terms" style={{ maxWidth: "668.48px" }}>
                            <h3>Điều khoản bắt buộc khi đăng ký online</h3>
                            <p id="term" className="scrollable-content fit-content" style={{ maxHeight: "400px", overflow: "auto", maxWidth: "668.48px" }}>
                                {editorData}
                            </p>
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
                                                {countChildren} x {(priceTour * 0.75).toLocaleString("en-US")}đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Trẻ nhỏ</td>
                                            <td className="t-price text-right" id="SmallChildrenPrice">
                                                {countSmallChildren} x {(priceTour * 0.5).toLocaleString("en-US")}đ
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
                                                {parseInt(countTotalPrice).toLocaleString("en-US")}đ
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