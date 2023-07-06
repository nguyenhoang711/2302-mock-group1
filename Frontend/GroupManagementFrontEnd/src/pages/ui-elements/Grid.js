import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Col,
  Container,
  Row
} from "reactstrap";

import { selectTours, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TourSelector";
import { connect } from "react-redux";
import { getListTourAction, updateSelectedRowsAction } from '../../redux/actions/TourActions';
import TourApi from '../../api/TourApi';
// import CustomSearch from "./CustomSearch";
// import CustomFilter from "./CustomFilter";
import './test1.css';

const Grid = (props) => {
  // const getListTour = props.getListTourAction;
  const size = props.size
  const [data, setData] = useState([]);

  useEffect(() => {
      const getAllTour = async () => {
        const result = await TourApi.getAll(1, size);
        // const tours = result.content;
        setData(result.content);
        console.log(result.content);
        // const totalSize = result.totalElements;
        // getListTour(tours, 1, totalSize);
      }
      getAllTour();
    }, 
    // [getListTour, size]
    []
    );

    const handleOnClick = () => {
      window.location.replace("http://localhost:3000/trips");
    }

  return (
    <Container fluid className="p-0">
        <h1 className="h3 text-primary text-center">Du lịch trong nước luôn là lựa chọn tuyệt vời. 
          Đường bờ biển dài hơn 3260km, những khu bảo tồn thiên 
          nhiên tuyệt vời, những thành phố nhộn nhịp, những di tích
          lịch sử hào hùng, nền văn hóa độc đáo và hấp dẫn, cùng 
          một danh sách dài những món ăn ngon nhất thế giới, 
          Việt Nam có tất cả những điều đó. Với lịch trình dày,
            khởi hành đúng thời gian cam kết, Vietravel là công ty 
            lữ hành uy tín nhất hiện nay tại Việt Nam, luôn sẵn 
            sàng phục vụ du khách mọi lúc, mọi nơi, đảm bảo tính 
            chuyên nghiệp và chất lượng dịch vụ tốt nhất thị trường
          </h1>
        <Row>
          {data.map((item) => (
            // {/* Render each data item */}
              <Col className="d-flex align-items-stretch" key={item.id} xs="20" sm="16" md="12" lg="4">
                <Card className="item">
                  <CardBody>
                      <img
                        alt="Sample"
                        src={`http://localhost:8080/api/v1/files/images/${item.thumbnail}`}
                      />
                      <CardBody>
                        <CardTitle className="tourName" tag="h2">
                          {item.name}
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h2"
                        >
                          {item.startDest}
                        </CardSubtitle>
                        <CardText>
                          Giá tour: <span className="h3 text-danger">{item.price}</span>
                        </CardText>
                      </CardBody>
                      <Button onClick={handleOnClick}>
                        Xem chi tiết
                      </Button>
                      <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">{item.numOfPeople}</span></CardText>
                  </CardBody>
                </Card>
              </Col>
        ))}
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour name
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour name kajgkdkgkdgsdktkghkkldsklaklgkldalklkgalkakdkadkj
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
              </Card>
          </Col>
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour name
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour namefkasgjakgjadkgkjakgkakdgkdkakgakgadk
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour name
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
              </Card>
          </Col>
          <Col xs="20" sm="16" md="12" lg="4">
              <Card className="item">
              <CardBody>
                  <img
                    alt="Sample"
                    src="http://localhost:8080/api/v1/files/images/1688009593169.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h2">
                      Tour name
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h2"
                    >
                      Nơi khởi hành
                    </CardSubtitle>
                    <CardText>
                      Giá tour: <span className="h3 text-danger">10000000</span>
                    </CardText>
                  </CardBody>
                  <Button>
                    Xem chi tiết
                  </Button>
                  <CardText className="h4 remain">Số chỗ còn nhận: <span className="text-danger">10</span></CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </Container>
  )
};

const mapGlobalStateToProps = state => {
  return {
    tours: selectTours(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default Grid;
