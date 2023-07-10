import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./showCustomerInfo.css";
import Header from "../../components/Header";
import moment from 'moment';
import BookingApi from '../../api/BookingApi';
import { useHistory } from 'react-router-dom';
import Footer2 from "../../components/Footer2";

const getValueFromURLParam = (paramName) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(paramName);
};

const convertDateToString = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.format('DD/MM/YYYY');
    } else {
        return 'Invalid Date';
    }
};

const convertDateTimeToString = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.format('DD/MM/YYYY HH:mm:ss');
    } else {
        return 'Invalid Date';
    }
};

const addDate = (date, timeAdd) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.add(timeAdd, 'hours');
    } else {
        return 'Invalid Date';
    }
}

const ShowCustomerInfo = () => {

    const contactFullName = localStorage.getItem('contactFullName');
    const contactEmail = localStorage.getItem('contactEmail');
    const contactPhoneNumber = localStorage.getItem('contactPhoneNumber');
    const contactAddress = localStorage.getItem('contactAdress');
    const totalPrice = getValueFromURLParam('totalPrice') ? getValueFromURLParam('totalPrice') : getValueFromURLParam('vnp_Amount') / 100;

    const bookingId = getValueFromURLParam('bookingId') ? getValueFromURLParam('bookingId') : getValueFromURLParam('vnp_OrderInfo');

    const tourId = useSelector((state) => state.CreateBooking.tripInfo.tourId);
    const tourName = useSelector((state) => state.CreateBooking.tripInfo.tourName);
    const startDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.startDate));
    const endDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.endDate));
    const startDest = useSelector((state) => state.CreateBooking.tripInfo.startDest);

    const [timeBooking, setTimeBooking] = useState();

    const [paymentTerm, setPaymentTerm] = useState();

    const [bookingStatus, setBookingStatus] = useState("Booking của quý khách đã được chúng tôi xác nhận thành công");

    const [amountPaid, setAmountPaid] = useState(0);

    const [remainingAmount, setRemainingAmount] = useState(totalPrice);

    useEffect(() => {
        setTimeout(() => {
            const getBookingById = async () => {
                const res = await BookingApi.getById(bookingId);
                const amountPaid = res.amountPaid;
                const remainingAmount = res.totalPrice - amountPaid;
                const timeBooking = res.timeBooking;
                setAmountPaid(amountPaid);
                setRemainingAmount(remainingAmount);
                setTimeBooking(convertDateTimeToString(timeBooking));
                setPaymentTerm(convertDateTimeToString(addDate(timeBooking, 1)));
            }
            getBookingById();
        }, 200);
    }, [amountPaid, remainingAmount, timeBooking]);

    const history = useHistory();

    useEffect(() => {
        const handlePageChange = () => {
            localStorage.setItem('isSendMail', 'false');
        };

        const unlisten = history.listen(() => {
            handlePageChange();
        });

        return () => {
            unlisten();
        };
    }, [history]);

    window.onload = () => {
        const ResponseCode = getValueFromURLParam('vnp_ResponseCode') ? getValueFromURLParam('vnp_ResponseCode') : "-1";
        if (ResponseCode === "00") {
            const updateBookingStatus = async () => {
                setAmountPaid(0);
                setRemainingAmount(totalPrice);
                setBookingStatus("Đã thanh toán");
                await BookingApi.updateStatus(bookingId, 'Đã thanh toán', totalPrice);
            }
            updateBookingStatus();
            let isSendMail = localStorage.getItem('isSendMail') ? localStorage.getItem('isSendMail') : '';
            if (isSendMail == 'false') {
                setTimeout(() => {
                    const sendMail = async () => {
                        await BookingApi.sendMailConfirm(contactEmail, bookingId);
                        localStorage.setItem('isSendMail', 'true');
                    };
                    sendMail();
                }, 1000);
            }
        }
    };


    const handleOnClickPaymentBtn = async () => {
        try {
            const res = await BookingApi.pay(bookingId, totalPrice);
            const url = res.url;
            window.location.replace(url);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Page</title>
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
                <Header />
                <div className="container3">
                    <div className="container-left">
                        <div className="contact-info card">
                            <div className="contact-head heading">
                                <h5>THÔNG TIN LIÊN LẠC</h5>
                            </div>
                            <div className="contact-detail">
                                <div className="contact-name contact-detail-item">
                                    <p className="lable">Họ tên</p>
                                    <p className="info">{contactFullName}</p>
                                </div>
                                <div className="contact-email contact-detail-item">
                                    <p className="lable">Email</p>
                                    <p className="info">{contactEmail}</p>
                                </div>
                                <div className="contact-address contact-detail-item">
                                    <p className="lable">Địa chỉ</p>
                                    <p className="info">{contactAddress}</p>
                                </div>
                                <div className="contact-phone-number contact-detail-item">
                                    <p className="lable">Di động</p>
                                    <p className="info">{contactPhoneNumber}</p>
                                </div>
                                <div className="contact-telephone contact-detail-item">
                                    <p className="lable">Điện thoại</p>
                                    <p className="info">{contactPhoneNumber}</p>
                                </div>
                                <div className="contact-note contact-detail-item">
                                    <p className="lable">Ghi chú</p>
                                    <p className="info">Booking từ travel.com.vn.</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-details card">
                            <div className="heading">
                                <h5>CHI TIẾT BOOKING</h5>
                            </div>
                            <div className="booking-row-container">
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Số booking</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span className="booking-number">{bookingId} </span>
                                        <span>
                                            (Quý khách vui lòng nhớ số booking để thuận tiện cho các giao
                                            dịch sau này)
                                        </span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Trị giá booking</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>{parseInt(totalPrice).toLocaleString("en-US")}₫</span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Số tiền đã thanh toán</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>{amountPaid.toLocaleString("en-US")}₫</span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Số tiền còn lại</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>{remainingAmount.toLocaleString("en-US")}₫</span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Ngày đăng kí</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>{timeBooking}</span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Hình thức thanh toán</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>Thanh toán bằng VNPAY</span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Tình trạng</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span>
                                            {bookingStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="booking-row-item">
                                    <div className="info booking-lable">
                                        <span>Thời hạn thanh toán</span>
                                    </div>
                                    <div className="content booking-content">
                                        <span className="booking-number">{paymentTerm} </span>
                                        <span>
                                            (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn
                                            thanh toán trên)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-right card">
                        <div className="heading">
                            <h5>PHIẾU XÁC NHẬN BOOKING</h5>
                        </div>
                        <div className="booking-accept-content">
                            <div className="info booking-accept-content-lable">
                                <span>
                                    {tourName}
                                </span>
                            </div>
                            <div className="booking-accept-number">
                                <span className="content ">Số booking: </span>
                                <span className="booking-number">{bookingId} </span>
                            </div>
                            <div className="booking-accept-payment">
                                <div className="booking-accept-item">
                                    <span className="info booking-accept-lable">Mã tour</span>
                                    <span className="content booking-accept-content">
                                        {tourId}
                                    </span>
                                </div>
                                <div className="booking-accept-item">
                                    <span className="info booking-accept-lable">Hành trình</span>
                                    <span className="content booking-accept-content">
                                        {tourName}
                                    </span>
                                </div>
                                <div className="booking-accept-item">
                                    <span className="info booking-accept-lable">Ngày đi</span>
                                    <span className="content booking-accept-content">{startDate}</span>
                                </div>
                                <div className="booking-accept-item">
                                    <span className="info booking-accept-lable">Ngày về</span>
                                    <span className="content booking-accept-content">{endDate}</span>
                                </div>
                                <div className="booking-accept-item">
                                    <span className="info booking-accept-lable">Nơi khởi hành</span>
                                    <span className="content booking-accept-content">{startDest}</span>
                                </div>
                                <p className="content booking-payment-detail">
                                    Để xem thông tin chương trình tour mới nhất Quý khách có thể dùng
                                    điện thoại để quét mã QR bên cạnh để truy cập vào website.
                                    <br /> <br />
                                    Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho ứng
                                    dụng của điện thoại với từ khóa sau: QRCode Scanner, QRCode
                                    Reader,..
                                </p>
                            </div>
                            <button className="payment-button" onClick={() => handleOnClickPaymentBtn()}>Thanh toán</button>
                        </div>
                    </div>
                </div>
                <Footer2/>
            </div>
        </div>
    )
}

export default ShowCustomerInfo;