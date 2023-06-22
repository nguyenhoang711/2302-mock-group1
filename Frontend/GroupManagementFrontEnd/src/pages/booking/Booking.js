import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";

import * as Icon from 'react-feather';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { connect } from "react-redux";

import { selectBookings } from "../../redux/selectors/BookingSelector";
import { getListBookingAction } from '../../redux/actions/BookingActions';
import BookingApi from '../../api/BookingApi';

const tableColumns = [
  {
    dataField: "trip.name",
    text: "Chuyến đi",
    sort: true
  },
  {
    dataField: "user.fullName",
    text: "Người đặt",
    sort: true
  },
  {
    dataField: "numOfPeople",
    text: "Số lượng hành khách",
    sort: true
  },
  {
    dataField: "totalPrice",
    text: "Tổng tiền",
    sort: true
  },
  {
    dataField: "details",
    text: "Chi tiết",
    sort: true
  }
];


const Booking = (props) => {

  const getListBooking = props.getListBookingAction;
  useEffect(() => {
    const getAllBooking = async () => {
      const result = await BookingApi.getAll();
      const bookings = result.content;
      getListBooking(bookings); 
    }

    getAllBooking();
  }, [getListBooking]);
  return(
    <Container fluid className="p-0">
    <h1 className="h3 mb-3">Booking Page</h1>
    <Row>
      <Col>
        <Card>
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={props.bookings}
              columns={tableColumns}
              bootstrap4
              striped
              bordered={false}
              pagination={paginationFactory({
                sizePerPage: 5,
                sizePerPageList: [5, 10, 25, 50]
              })}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  )
};

const mapGlobalStateToProps = state => {
  return {
    bookings: selectBookings(state),
  };
};

export default connect(mapGlobalStateToProps, { getListBookingAction })(Booking);
