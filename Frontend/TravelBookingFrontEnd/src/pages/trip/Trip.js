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
import ReactHtmlParser from 'react-html-parser'


// const Trip = () => {

const handleLinkClick = (tripId) => {
    window.location.href = `http://localhost:3000/createBooking?tripId=${tripId}`;
};
//     return (
//         <>
//             <h1 style={{ cursor: "pointer" }}>City Đà Lạt - Săn mây đón bình minh - Thưởng thức Trà Long Đình</h1>
//             <button onClick={() => handleLinkClick('1')}>Đặt ngay</button>
//             <br /> <br />
//             <h1 style={{ cursor: "pointer" }} onClick={() => handleLinkClick('2')}>KDL Bà Nà – Sơn Trà – Hội An - La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế</h1>
//             <button onClick={() => handleLinkClick('2')}>Đặt ngay</button>
//             <hr />
//         </>
//     )
// }

// export default Trip;


export default function Trip(props) {




    const { codeTrip } = useParams()
    console.log(codeTrip)
    const [tripByCodeTrio, setTripByCodeTrio] = useState(
        {
        }
    );

    useEffect(() => {

        getTripByCode(codeTrip)

        console.log(tripByCodeTrio)


    }, [codeTrip]);
    const getTripByCode = React.useCallback(async (codeTrip) => {
        let res = await TripApi.getById(codeTrip);
        setTripByCodeTrio(res)

        console.log(res)
    }, [])

    return (
        <>
            <Container>
                <Row className="rowTitle m-4">

                    <Col lg="8">
                        <h2>{tripByCodeTrio.destinationTour}({tripByCodeTrio.hotel})</h2>
                        <Button >Like</Button>
                    </Col>
                    <Col lg="4" className="text-right">
                        <h2 className='text-danger'>{tripByCodeTrio.priceAdult}đ/khách</h2>
                        <Button className="btn-lg" onClick={() => handleLinkClick('1')} >Đặt ngay</Button>
                    </Col>
                </Row>
                <Row className="rowImg m-4">
                    <Col lg="7" className="flex-center">

                        <img src="https://media.travel.com.vn/tour/tfd_230420052439_028008.jpg" className="img-fluid" alt="image" />

                    </Col>
                    <Col lg="5" className="flex-center">
                        <Row >
                            <Col lg="12">
                                <Row className="">
                                    <Col lg="6" className="flex-center">
                                        <img src="https://media.travel.com.vn/tour/tfd_230420052007_136118.jpg" className="img-fluid" alt="image" />

                                    </Col>
                                    <Col lg="6" className="flex-center">
                                        <img src="https://media.travel.com.vn/tour/tfd_230420052332_006690.jpg" className="img-fluid" alt="image" />

                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="12 mt-6">
                                <img src="https://media.travel.com.vn/destination/dc_230420_PHU QUOC (18).jpg" className="img-fluid  mb-0" alt="image" />

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="rowChiTietTrip m-4">

                    <Col lg="4" >
                        <Card className="p-2 font-weight-bolder">
                            <CardText>Khởi hành: {tripByCodeTrio.startDate}</CardText>
                            <CardText>Tập trung: Trước khi khởi hành 1h30p</CardText>
                            <CardText>Thời gian: {tripByCodeTrio.timeTour} ngày</CardText>
                            <CardText>Nơi khởi hành: {tripByCodeTrio.startingGateTour}</CardText>
                            <CardText>Số chỗ còn nhận:{tripByCodeTrio.numberOfPassengers}</CardText>
                        </Card>
                    </Col>
                    <Col lg="8" className="mt-3 ">

                        <Row className="text-center">

                            <Col className="p-2">
                                {/* < HourglassFullIcon /> */}

                                <h5 className='title'>Khách sạnn</h5>
                                {tripByCodeTrio.hotel}
                            </Col>
                            <Col className="p-2">
                                {/* <AirportShuttleIcon/> */}
                                <h5 className='title'>Phương tiện di chuyển</h5>
                                {tripByCodeTrio.vehicleTour}
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
                            <CardText>{ReactHtmlParser(tripByCodeTrio.descriptionTour)}</CardText>
                        </Card>
                    </Col>
                </Row>
                <Row className="rowGia m-4 font-weight-bolder">
                    <Col lg="5">
                        <Card className="p-2">
                            <CardText tag="h4">Thông tin hướng dẫn viên</CardText>
                            HDV:{ReactHtmlParser(tripByCodeTrio.nameGuide)}
                            <p id="cKeditor"></p>
                            {/* <CardText>HDV : {(tripByCodeTrio.nameGuide !==null )? (tripByCodeTrio.nameGuide):("Đang cập nhập")}</CardText> */}
                            <CardText>Số điện thoại :{(tripByCodeTrio.phoneGuide !== null) ? (tripByCodeTrio.phoneGuide) : ("Đang cập nhập")}</CardText>
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
                                        <td>{tripByCodeTrio.priceAdult} đ</td>
                                    </tr>
                                    <tr>

                                        <td>Trẻ em</td>
                                        <td>{tripByCodeTrio.priceChildren} đ</td>
                                    </tr>
                                    <tr>

                                        <td>Phụ thu phòng đơn</td>
                                        <td>{tripByCodeTrio.surcharge} đ</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}