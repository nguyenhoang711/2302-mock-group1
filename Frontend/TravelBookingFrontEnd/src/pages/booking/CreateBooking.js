
import React, { useEffect, useState } from "react";
import './createBooking.css';
import BookingApi from '../../api/BookingApi';
import Header from "../../components/Header";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { getTripById } from "../../redux/actions/CreateBookingAction";
import UserApi from '../../api/UserApi';
import BookingContactApi from '../../api/BookingContactApi';
import { useFormik } from "formik";
import * as yup from "yup";
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

const CreateBooking = () => {
    const dispatch = useDispatch();

    const [tripId, setTripId] = useState(1);

    const tourName = useSelector((state) => state.CreateBooking.tripInfo.tourName);
    const tourImg = useSelector((state) => state.CreateBooking.tripInfo.tourImg);
    const numOfPeople = useSelector((state) => state.CreateBooking.tripInfo.numOfPeople);
    const startDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.startDate));
    const endDate = convertDateToString(useSelector((state) => state.CreateBooking.tripInfo.endDate));
    const duration = useSelector((state) => state.CreateBooking.tripInfo.duration);
    const startDest = useSelector((state) => state.CreateBooking.tripInfo.startDest);
    const priceTour = useSelector((state) => state.CreateBooking.tripInfo.priceTour);

    window.onload = () => {
        setTimeout(() => {
            const textarea = document.getElementById('note');
            textarea.value = textarea.value.replace(/\s/g, '');
        }, 200);
    }

    useEffect(() => {
        let tripId = getValueFromURLParam('tripId');
        setTripId(tripId);
        dispatch(getTripById(tripId));

    }, []);

    const [countAdult, setCountAdult] = useState(1);

    const increaseAgeAdult = () => {
        if (countTotalPeople + 1 <= numOfPeople) {
            setCountAdult(countAdult + 1);
        }
        else {
            alert("Số khách tối đa là: " + numOfPeople);
        }
    };

    const decreaseAgeAdult = () => {
        if (countAdult <= 0) {
            alert("Số lượng phải >= 0");
        }
        else if (countTotalPeople - 1 > 0) {
            setCountAdult(countAdult - 1);
        }
        else {
            alert("Số lượng khách tối thiểu là 1")
        }
    };

    const [countChildren, setCountChildren] = useState(0);

    const increaseAgeChildren = () => {
        if (countTotalPeople + 1 <= numOfPeople) {
            setCountChildren(countChildren + 1);
        }
        else {
            alert("Số khách tối đa là: " + numOfPeople);
        }
    };

    const decreaseAgeChildren = () => {
        if (countChildren <= 0) {
            alert("Số lượng phải >= 0");
        }
        else if (countTotalPeople - 1 > 0) {
            setCountChildren(countChildren - 1);
        }
        else {
            alert("Số lượng khách tối thiểu là 1")
        }
    };

    const [countSmallChildren, setCountSmallChildren] = useState(0);

    const increaseAgeSmallChildren = () => {
        if (countTotalPeople + 1 <= numOfPeople) {
            setCountSmallChildren(countSmallChildren + 1);
        }
        else {
            alert("Số khách tối đa là: " + numOfPeople);
        }
    };

    const decreaseAgeSmallChildren = () => {
        if(countSmallChildren <= 0){
            alert("Số lượng phải >= 0");
        }
        else if (countTotalPeople - 1 > 0) {
            setCountSmallChildren(countSmallChildren - 1);
        }
        else {
            alert("Số lượng khách tối thiểu là 1")
        }
    };

    const [countBaby, setCountBaby] = useState(0);

    const increaseAgeBaby = () => {
        if (countTotalPeople + 1 <= numOfPeople) {
            setCountBaby(countBaby + 1);
        }
        else {
            alert("Số khách tối đa là: " + numOfPeople);
        }
    };

    const decreaseAgeBaby = () => {
        if(countBaby <= 0){
            alert("Số lượng phải >= 0");
        }
        else if (countTotalPeople - 1 > 0) {
            setCountBaby(countBaby - 1);
        }
        else {
            alert("Số lượng khách tối thiểu là 1")
        }
    };

    const [countTotalPeople, setCountTotalPeople] = useState(0);

    const [countTotalPrice, setCountTotalPrice] = useState(0);

    useEffect(() => {
        const totalCount = countAdult + countChildren + countSmallChildren + countBaby;
        setCountTotalPeople(totalCount);
    }, [countAdult, countChildren, countSmallChildren, countBaby]);

    useEffect(() => {
        setTimeout(() => {
            const price = priceTour;
            const totalPrice = countAdult * price + countChildren * price * 0.75 + countSmallChildren * price * 0.5;
            setCountTotalPrice(totalPrice);
        }, 200);
    }, [countAdult, countChildren, countSmallChildren, countTotalPrice]);

    const setCountToLocalStorage = () => {
        localStorage.setItem('countAdult', countAdult);
        localStorage.setItem('countChildren', countChildren);
        localStorage.setItem('countSmallChildren', countSmallChildren);
        localStorage.setItem('countBaby', countBaby);
        localStorage.setItem('countTotalPeople', countTotalPeople);
        localStorage.setItem('countTotalPrice', countTotalPrice);
    }

    const handleNotesChange = () => {
        const checkboxes = document.querySelectorAll('.note-more');
        let notes = "";

        let notesCheckBox = 'Các lưu ý:\n';
        let countChecked = 0;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                countChecked++;
                notesCheckBox += '  - ' + checkbox.value + '\n';
            }
        });

        let moreNote = '';
        const getMoreNote = document.getElementById('note').value;
        if (getMoreNote != '') {
            moreNote += "Ghi chú thêm: \n  - " + getMoreNote;
        }

        if (countChecked === 0 && getMoreNote === '') {
            notes = "Không có";
        }
        else {
            notes = notesCheckBox + moreNote;
        }

        return notes;
    }

    const [contactFullName, setContactFullname] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [contactAddress, setContactAddress] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getUsersByEmail = async () => {
            const email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
            try {
                if (email) {
                    const res = await UserApi.getUserByEmail(email);
                    const userId = res.id;
                    const fullName = res.fullName;
                    const uemail = res.email;
                    const phoneNumber = res.phoneNumber;
                    const address = res.address;
                    setContactFullname(fullName);
                    setContactEmail(uemail);
                    setContactPhoneNumber(phoneNumber);
                    setContactAddress(address);
                    setUserId(userId)
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        };
        getUsersByEmail();
    })

    useEffect(() => {
        const contactFullName = document.getElementById('contact_name').value;
        const contactEmail = document.getElementById('email').value;
        const contactPhoneNumber = document.getElementById('mobilephone').value;
        const contactAddress = document.getElementById('address').value;
        localStorage.setItem("contactFullName", contactFullName);
        localStorage.setItem("contactEmail", contactEmail);
        localStorage.setItem("contactPhoneNumber", contactPhoneNumber);
        localStorage.setItem("contactAdress", contactAddress);
    });

    const nameRegex = /^[\s\p{L}]+$/u;
    const phoneRegex = /^0[0-9]*$/;

    const basicSchema = yup.object().shape({
        contact_name: yup.string()
            .matches(nameRegex, "Fullname contains only alphabetic characters")
            .required("Fullname is a required field"),
        email: yup.string()
            .email("Please enter a valid email")
            .required("Email is a required field"),
        mobilephone: yup.string()
            .length(10, "Phone number must be exactly 10 numbers")
            .matches(phoneRegex, "Please enter a valid phone number")
            .required("Phone number is a required field"),
        address: yup.string()
            .max(100)
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useFormik({
        initialValues: {
            contact_name: "",
            email: "",
            mobilephone: "",
            address: ""
        },
        validationSchema: basicSchema,
        validateOnChange: true,
        validateOnBlur: true,
    });

    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            contact_name: contactFullName,
            email: contactEmail,
            mobilephone: contactPhoneNumber,
            address: contactAddress
        }));
    }, [contactFullName, contactEmail, contactPhoneNumber, contactAddress, setValues]);


    const timeBooking = moment();

    const handleOnSubmitCreateBooking = async () => {
        try {
            if (localStorage.getItem('userName')) {
                var uId = userId;
            }
            else {
                var uId = 1;
            }
            const notes = handleNotesChange();

            if (errors.contact_name || errors.email || errors.mobilephone || errors.address) {
                alert("Vui lòng nhập đúng thông tin các trường");
            }
            else {
                const contactFullName = document.getElementById('contact_name').value;
                const contactEmail = document.getElementById('email').value;
                const contactPhoneNumber = document.getElementById('mobilephone').value;
                const contactAddress = document.getElementById('address').value;
                const checkEmailExist = await BookingContactApi.existsByEmail(contactEmail);
                if (checkEmailExist) {
                    const bookingContact = await BookingContactApi.findByEmail(contactEmail);
                    const bookingContactId = bookingContact.id;
                    await BookingContactApi.updateBookingContact(bookingContactId, contactFullName, contactPhoneNumber, contactAddress);

                }
                else {
                    await BookingContactApi.createBookingContact(contactFullName, contactEmail, contactPhoneNumber, contactAddress);
                }
                const bookingContact = await BookingContactApi.findByEmail(contactEmail);
                const bookingContactId = bookingContact.id;

                await BookingApi.createBooking(tripId, uId, bookingContactId, countTotalPeople, timeBooking, countTotalPrice, notes, 0, 'Chưa thanh toán');

                const result = await BookingApi.getAll(1, 5);
                const bookings = result.content;
                const bookingId = bookings[0].id;

                alert("Đặt tour thành công");
                setCountToLocalStorage();
                localStorage.setItem('isSendMail', 'false');
                window.location.replace(`http://localhost:3000/bookingCheckout?bookingId=${bookingId}`);
            }
        } catch (error) {
            alert("Đặt tour thất bại");
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
                        <div className="card-img">
                            {/* <img src={`./img/${tourImg}`} alt="Ảnh" /> */}
                            <img src={`http://localhost:8080/api/v1/files/images/${tourImg}`} alt="Ảnh" />
                        </div>
                        <div className="card-content">
                            <div className="card-content-title">
                                <span>
                                    {tourName}
                                </span>
                            </div>
                            <div className="card-content-details">
                                <p>
                                    <span>Mã tour: </span>
                                    <span>{tripId}</span>
                                </p>
                                <p>
                                    <span>Khởi hành: </span>
                                    <span>{startDate?.toString()}</span>
                                </p>
                                <p>
                                    <span>Thời gian: </span>
                                    <span>{duration}</span>
                                </p>
                                <p>
                                    <span>Nơi khởi hành: </span>
                                    <span>{startDest}</span>
                                </p>
                                <p>
                                    <span>Số chỗ còn nhận: </span>
                                    <span>{numOfPeople}</span>
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
                                    <form action="#" onSubmit={handleSubmit}>
                                        <div className="name form-element">
                                            <label>
                                                Họ và Tên <b>*</b>
                                            </label>
                                            <input
                                                id="contact_name"
                                                name="contact_name"
                                                type="text"
                                                value={values.contact_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.contact_name && touched.contact_name ? "form-control input-error" : "form-control"}
                                                placeholder="Nhập họ tên..."
                                            />
                                            <div className="form-error">
                                                {errors.contact_name && touched.contact_name && <p>{errors.contact_name}</p>}
                                            </div>
                                        </div>
                                        <div className="mail form-element">
                                            <label>
                                                Email <b>*</b>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.email && touched.email ? "form-control input-error" : "form-control"}
                                                placeholder="Nhập email..."
                                            />
                                            <div className="form-error">
                                                {errors.email && touched.email && <p>{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="phone form-element">
                                            <label>
                                                Số điện thoại <b>*</b>
                                            </label>
                                            <input
                                                id="mobilephone"
                                                name="mobilephone"
                                                type="text"
                                                value={values.mobilephone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.mobilephone && touched.mobilephone ? "form-control input-error" : "form-control"}
                                                placeholder="Nhập số điện thoại..."
                                            />
                                            <div className="form-error">
                                                {errors.mobilephone && touched.mobilephone && <p>{errors.mobilephone}</p>}
                                            </div>
                                        </div>
                                        <div className="addess form-element">
                                            <label>Địa chỉ</label>
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.address && touched.address ? "form-control input-error" : "form-control"}
                                                placeholder="Nhập địa chỉ..."
                                            />
                                            <div className="form-error">
                                                {errors.address && touched.address && <p>{errors.address}</p>}
                                            </div>
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
                                            <span onClick={() => decreaseAgeAdult()}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="adult">
                                                {countAdult}
                                            </span>
                                            <span onClick={() => increaseAgeAdult()}>
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
                                            <span onClick={() => decreaseAgeChildren()}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="children">
                                                {countChildren}
                                            </span>
                                            <span onClick={() => increaseAgeChildren()}>
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
                                            <span onClick={() => decreaseAgeSmallChildren()}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="smallchildren">
                                                {countSmallChildren}
                                            </span>
                                            <span onClick={() => increaseAgeSmallChildren()}>
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
                                            <span onClick={() => decreaseAgeBaby()}>
                                                <i className="fal fa-minus-circle" />
                                            </span>
                                            <span className="number" id="baby">
                                                {countBaby}
                                            </span>
                                            <span onClick={() => increaseAgeBaby()}>
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
                                        // onClick="javascript:window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=375,height=667');return false;"
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
                                        <img src={`http://localhost:8080/api/v1/files/images/${tourImg}`} alt="image" />
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
                                                    {countAdult > 0 ? `${countAdult} x ${priceTour ? priceTour.toLocaleString("en-US") : priceTour}₫` : '0₫'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Trẻ em</td>
                                                <td className="t-price text-right" id="ChildrenPrice">
                                                    {countChildren > 0 ? `${countChildren} x ${priceTour ? (priceTour * 0.75).toLocaleString("en-US") : priceTour}₫` : '0₫'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Trẻ nhỏ</td>
                                                <td className="t-price text-right" id="SmallChildrenPrice">
                                                    {countSmallChildren > 0 ? `${countSmallChildren} x ${priceTour ? (priceTour * 0.5).toLocaleString("en-US") : priceTour}₫` : '0₫'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Em bé</td>
                                                <td className="t-price text-right" id="BabyPrice">
                                                    {countBaby > 0 ? `${countBaby} x 0₫` : '0₫'}
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
                                                    {countTotalPrice.toLocaleString("en-US")}₫
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-order"
                                            style={{ width: "100%" }}
                                            onClick={() => handleOnSubmitCreateBooking()}
                                        >
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer2 />
            </div>
        </div>


    )
}

export default CreateBooking;