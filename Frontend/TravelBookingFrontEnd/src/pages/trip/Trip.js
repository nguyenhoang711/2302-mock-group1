import React, { useEffect, useState } from "react";
import './Trip.css';
import { useParams } from 'react-router-dom';
import TripApi from '../../api/TripApi';
import {
    Card,
    CardText,
    Table,

    Col,
    Button,
    Container,
    Row,

} from "reactstrap";
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import Header from "../../components/Header";
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


const Trip = () => {

    const [tourId, setTourId] = useState(0);
    const [tripId, setTripId] = useState(0);
    const [tourName, setTourName] = useState('');
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState('');
    const [startDest, setStartDest] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(0);
    const [curatorName, setCuratorName] = useState('');
    const [hotel, setHotel] = useState('');
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [tripOptions, setTripOptions] = useState([]);


    useEffect(() => {
        let tourId = getValueFromURLParam('tourId');
        setTimeout(() => {
            const getTripByTourId = async () => {
                let res = await TripApi.getByTourId(tourId);
                console.log(res);
                setTourId(tourId);
                setTripId(res[0].id);
                setTourName(res[0].tour.name);
                setPrice(res[0].tour.price);
                setStartDate(convertDateToString(res[0].startDate));
                setEndDate(convertDateToString(res[0].endDate));
                setStartDest(res[0].tour.startDest);
                const day = res[0].tour.day;
                const night = res[0].tour.night;
                const duration = day + ' ngày ' + night + ' đêm';
                setDuration(duration);
                setNumOfPeople(res[0].tour.numOfPeople);
                setHotel(res[0].hotel);
                setCuratorName(res[0].curatorName);
                setDescription(res[0].tour.details);
                setImage1(res[0].tour.image1);
                setImage2(res[0].tour.image2);
                setImage3(res[0].tour.image3);
                setImage4(res[0].tour.image4);
                const options = res.map((item) => (
                    <option key={item.id} value={item.id}>{convertDateToString(item.startDate)}</option>
                ));
                setTripOptions(options);
            }
            getTripByTourId();
        }, 500);
    }, [tourId]);

    const handleOnClick = () => {
        window.location.href = `http://localhost:3000/createBooking?tripId=${tripId}`;
    };

    const handleOptionChange = (event) => {
        let tripId = event.target.value;
        const getTripById = async () => {
            let res = await TripApi.getById(tripId);
            setTourId(tourId);
            setTripId(res.id);
            setTourName(res.tour.name);
            setPrice(res.tour.price);
            setStartDate(convertDateToString(res.startDate));
            setEndDate(convertDateToString(res.endDate));
            setStartDest(res.tour.startDest);
            const day = res.tour.day;
            const night = res.tour.night;
            const duration = day + ' ngày ' + night + ' đêm';
            setDuration(duration);
            setNumOfPeople(res.tour.numOfPeople);
            setHotel(res.hotel);
            setCuratorName(res.curatorName);
            setDescription(res.tour.details);
        }
        getTripById();
    }


    return (
        <>
            <Header />
            <Container>
                <Row className="rowTitle m-4">

                    <Col lg="8">
                        <h2>{tourName}</h2>

                        <Button >Like</Button>
                    </Col>
                    <Col lg="4" className="text-right">
                        <h2 className='text-danger'>{price.toLocaleString('en-US')}đ/khách</h2>
                        <Button className="btn-lg" onClick={() => handleOnClick()} >Đặt ngay</Button>
                    </Col>
                </Row>
                <Row className="rowImg m-4">
                    <Col lg="7" className="flex-center">

                        <img src={`http://localhost:8080/api/v1/files/images/${image1}`} className="img-fluid" alt="image" />

                    </Col>
                    <Col lg="5" className="flex-center">
                        <Row >
                            <Col lg="12">
                                <Row className="">
                                    <Col lg="6" className="flex-center">
                                        <img src={`http://localhost:8080/api/v1/files/images/${image2}`} className="img-fluid" alt="image" />

                                    </Col>
                                    <Col lg="6" className="flex-center">
                                        <img src={`http://localhost:8080/api/v1/files/images/${image3}`} className="img-fluid" alt="image" />

                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="12 mt-6">
                                <img src={`http://localhost:8080/api/v1/files/images/${image4}`} className="img-fluid  mb-0" alt="image" />

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="rowChiTietTrip m-4">

                    <Col lg="4" >
                        <Card className="p-2 font-weight-bolder">
                            <CardText>Khởi hành: {startDate}</CardText>
                            <CardText>Tập trung: Trước khi khởi hành 1h30p</CardText>
                            <CardText>Thời gian: {duration}</CardText>
                            <CardText>Nơi khởi hành: {startDest}</CardText>
                            <CardText>Số chỗ còn nhận: {numOfPeople}</CardText>
                            <CardText>
                                <div className="pickDate">
                                    <label>Chọn ngày khác: </label>
                                    <select style={{ width: '100px', marginLeft: '20px' }} onChange={handleOptionChange}>
                                        {tripOptions}
                                    </select>
                                </div>
                            </CardText>
                        </Card>
                    </Col>
                    <Col lg="8" className="mt-3 ">

                        <Row className="text-center">

                            <Col className="p-2">
                                {/* < HourglassFullIcon /> */}

                                <h5 className='title'>Khách sạn</h5>
                                {hotel}
                            </Col>
                            <Col className="p-2">
                                {/* <AirportShuttleIcon/> */}
                                <h5 className='title'>Phương tiện di chuyển</h5>
                                Xe bus
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col className="p-2">
                                {/* < RestaurantMenuIcon/> */}
                                <h5 className='title'>Ẩm thực</h5>
                                Buffet sáng, Theo thực đơn
                            </Col>
                            <Col className="p-2">
                                {/* <DiscountIcon/> */}
                                <h5 className='title'>Ưu đãi</h5>
                                Ưu đãi đã bao gồm trong giá tour
                            </Col>
                        </Row>
                        <hr />
                    </Col>

                </Row>
                <h3 className='text-center'>Lịch trình</h3>
                {/* <hr width="80%" /> */}
                <Row className="rowLoTrinh m-4">

                    {/* <Col lg="3">
                        <Card className="p-3">
                            <CardTitle>Thông tin lịch trình</CardTitle>
                           
                        </Card>
                    </Col> */}
                    <Col >
                        <Card className="p-3">
                            <CardText tag="h4">Chi tiết lịch trình</CardText>
                            <CardText>{ReactHtmlParser(description)}</CardText>
                        </Card>
                    </Col>
                </Row>
                <Row className="rowGia m-4 font-weight-bolder">
                    <Col lg="5">
                        <Card className="p-2">
                            <CardText tag="h4">Thông tin hướng dẫn viên</CardText> <br />
                            HDV: {curatorName}
                            <p id="cKeditor"></p>
                            {/* <CardText>HDV : {(tripByCodeTrio.nameGuide !==null )? (tripByCodeTrio.nameGuide):("Đang cập nhập")}</CardText> */}
                            {/* <CardText>Số điện thoại :{}</CardText> */}
                        </Card>
                    </Col>
                    <Col lg="7">
                        <Card className="p-2">
                            <CardText tag="h4">Giá phòng & phụ thu</CardText>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Loại khách</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Người lớn</td>
                                        <td>{price.toLocaleString('en-US')} đ</td>
                                    </tr>
                                    <tr>

                                        <td>Trẻ em</td>
                                        <td>{(price * 0.75).toLocaleString('en-US')} đ</td>
                                    </tr>
                                    <tr>

                                        <td>Phụ thu phòng đơn</td>
                                        <td>0đ</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer2/>
        </>
    )
}

export default Trip;