import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectBookings, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/BookingSelector";
import { connect } from "react-redux";
import { getListBookingAction, updateSelectedRowsAction } from '../../redux/actions/BookingActions';
import BookingApi from '../../api/BookingApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import { FastField, Field, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";
import moment from 'moment';
import './booking.css';

const convertDateToString = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return momentDate.format('DD/MM/YYYY HH:mm:ss');
    } else {
        return 'Invalid Date';
    }
};

const Booking = (props) => {

    const getListBooking = props.getListBookingAction;
    const size = props.size;

    useEffect(() => {
        const getAllBooking = async () => {
            const result = await BookingApi.getAll(1, size);
            const bookings = result.content;
            const totalSize = result.totalElements;
            getListBooking(bookings, 1, totalSize);
            console.log(result);
        }
        getAllBooking();
    }, [getListBooking, size]);

    const actionFormatter = (cell, row, rowIndex) => {

        return (
            <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateBooking(row.id)} />
        );
    };

    const  formatPrice = (price) => {
        return price.toLocaleString("en-US") + '₫';
    }

    const formatDate = (date) => {
        return convertDateToString(date);
    }

    const tableColumns = [
        {
            dataField: "trip.tour.name",
            text: "Chuyến đi",
            sort: true
        },
        {
            dataField: "bookingContact.fullName",
            text: "Người đặt",
            sort: true
        },
        {
            dataField: "numOfPeople",
            text: "Số lượng khách",
            sort: true
        },
        {
            dataField: "timeBooking",
            text: "Thời gian đặt tour",
            sort: true,
            formatter: (cell, row) => formatDate(cell)
        },
        {
            dataField: "totalPrice",
            text: "Tổng tiền",
            sort: true,
            formatter: (cell, row) => formatPrice(cell)
        },
        {
            dataField: "details",
            text: "Ghi chú",
            sort: true
        },
        {
            dataField: "bookingStatus",
            text: "Trạng thái",
            sort: true
        },
        {
            dataField: "action",
            text: "",
            formatter: actionFormatter,
            headerStyle: (colum, colIndex) => {
                return { width: '80px' };
            },
            align: () => {
                return 'center';
            },
        }
    ];

    const handleTableChange = async (type, { page, sortField, sortOrder, searchText }) => {
        // sort
        if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
            sortField = 'id'
            sortOrder = 'desc';
        }

        const result = await BookingApi.getAll(page, size, sortField, sortOrder, searchText);
        const bookings = result.content;
        const totalSize = result.totalElements;
        getListBooking(bookings, page, totalSize, searchText);
    }

    // refresh form
    const refreshForm = () => {
        // refresh selected rows
        props.updateSelectedRowsAction([]);

        handleTableChange(null,
            {
                page: 1,
                sortField: null,
                sortOrder: null,
                searchText: '',
            }
        );
    }

    const showSuccessNotification = (title, message) => {
        const options = {
            timeOut: 3000,
            showCloseButton: false,
            progressBar: false,
            position: "top-right"
        };

        // show notification
        toastr.success(title, message, options);
    }

    const showErrorNotification = (title, message) => {
        const options = {
            timeOut: 3000,
            showCloseButton: false,
            progressBar: false,
            position: "top-right"
        };

        // show notification
        toastr.error(title, message, options);
    }


    // update booking
    const [bookingUpdateInfo, setBookingUpdateInfo] = useState();

    const updateBooking = async (bookingId) => {
        setOpenModalUpdate(true);
        const bookingInfo = await BookingApi.getById(bookingId);
        setBookingUpdateInfo(bookingInfo);
    }

    const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

    // delete
    const handleOnSelect = (row, isSelect) => {

        let selected = props.selectedRows;

        if (isSelect) {
            selected = [...props.selectedRows, row.id]
        } else {
            selected = props.selectedRows.filter(x => x !== row.id)
        }

        props.updateSelectedRowsAction(selected);
    }

    const handleOnSelectAll = (isSelect, rows) => {

        let selected = props.selectedRows;

        const ids = rows.map(r => r.id);
        if (isSelect) {
            selected = ids
        } else {
            selected = []
        }

        props.updateSelectedRowsAction(selected);
    }

    const deleteBooking = async () => {
        if (props.selectedRows.length !== 0) {
            try {
                await BookingApi.deleteByIds(props.selectedRows);
                showSuccessNotification(
                    "Delete Booking",
                    "Delete Booking Successfully!");
                refreshForm();
            } catch (error) {
                console.log(error);
                // redirect page error server
                props.history.push("/auth/500");
            }
        } else {
            showErrorNotification(
                "Delete Booking",
                "You must select bookings"
            );
        }
    }


    return (

        <Container fluid className="p-0">
            <h1 className="h3 mb-3" style={{ padding: "1.25rem 1.25rem 0 1.25rem" }}>Booking Management</h1>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <ToolkitProvider
                                keyField="id"
                                data={props.bookings}
                                columns={tableColumns}
                                search
                            >
                                {
                                    toolkitprops => (
                                        <>
                                            {/* Search */}
                                            <Row style={{ alignItems: "center" }}>
                                                <Col lg="3">
                                                    <CustomSearch {...toolkitprops.searchProps} />
                                                </Col>
                                                <Col lg="9">
                                                    <div className="float-right pull-right">
                                                        <Icon.RefreshCcw className="align-middle mr-2" size={24} onClick={refreshForm} />
                                                        <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteBooking} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <BootstrapTable
                                                {...toolkitprops.baseProps}
                                                bootstrap4
                                                striped
                                                hover
                                                bordered
                                                remote
                                                pagination={paginationFactory({
                                                    page: props.page,
                                                    sizePerPage: props.size,
                                                    totalSize: props.totalSize,

                                                    withFirstAndLast: false,
                                                    alwaysShowAllBtns: true,

                                                    hideSizePerPage: true,
                                                })}
                                                selectRow={{
                                                    mode: 'checkbox',
                                                    clickToSelect: true,
                                                    selected: props.selectedRows,
                                                    onSelect: handleOnSelect,
                                                    onSelectAll: handleOnSelectAll
                                                }}
                                                onTableChange={handleTableChange}
                                            />
                                        </>
                                    )
                                }
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={isOpenModalUpdate}>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            tripName: bookingUpdateInfo && bookingUpdateInfo.trip.tour.name ? bookingUpdateInfo.trip.tour.name : '',
                            fullName: bookingUpdateInfo && bookingUpdateInfo.bookingContact.fullName ? bookingUpdateInfo.bookingContact.fullName : '',
                            numOfPeople: bookingUpdateInfo && bookingUpdateInfo.numOfPeople ? bookingUpdateInfo.numOfPeople : '',
                            totalPrice: bookingUpdateInfo && bookingUpdateInfo.totalPrice ? bookingUpdateInfo.totalPrice : '',
                            details: bookingUpdateInfo && bookingUpdateInfo.details ? bookingUpdateInfo.details : '',
                        }
                    }
                    validationSchema={
                        Yup.object({
                            tripName: Yup.string(),
                            fullName: Yup.string(),
                            numOfPeople: Yup.number()
                                .min(1, "Nhập số lượng lơn hơn hoặc bằng 1"),
                            // timeBooking: Yup.date(),
                            totalPrice: Yup.number(),
                            details: Yup.string(),
                            // bookingStatus: Yup.string(),


                        })
                    }

                    onSubmit={

                        async values => {
                            try {

                                await BookingApi.update(
                                    bookingUpdateInfo.id,
                                    bookingUpdateInfo.trip.id,
                                    bookingUpdateInfo.bookingContact.id,
                                    values.numOfPeople,
                                    values.totalPrice + (values.numOfPeople - bookingUpdateInfo.numOfPeople) * bookingUpdateInfo.trip.tour.price,
                                    values.details,
                                );
                                // show notification
                                showSuccessNotification(
                                    "Update Booking",
                                    "Update Booking Successfully!"
                                );
                                // close modal
                                setOpenModalUpdate(false);
                                // Refresh table
                                refreshForm();
                            } catch (error) {
                                console.log(error);
                                setOpenModalUpdate(false);
                                // redirect page error server
                                props.history.push("/auth/500");
                            }
                        }
                    }

                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* header */}
                            <ModalHeader>Update Booking</ModalHeader>

                            {/* body */}
                            <ModalBody className="m-3">

                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Chuyến đi:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="text"
                                            bsSize="lg"
                                            name="tripName"
                                            placeholder="Nhập tên chuyến đi"
                                            component={ReactstrapInput}
                                            disabled="true"
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Người đặt:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="text"
                                            bsSize="lg"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="Nhập tên người đặt"
                                            component={ReactstrapInput}
                                            disabled="true"
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Số lượng:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="number"
                                            bsSize="lg"
                                            name="numOfPeople"
                                            id="numOfPeople"
                                            placeholder="Enter total member"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Tổng tiền:</label>
                                    </Col>
                                    <Col>
                                        <FastField
                                            type="number"
                                            bsSize="lg"
                                            name="totalPrice"
                                            id="totalPrice"
                                            placeholder="Enter total price"
                                            component={ReactstrapInput}
                                            disabled="true"
                                        />
                                    </Col>
                                </Row>

                                <Row style={{ alignItems: "center" }}>
                                    <Col lg="auto">
                                        <label>Ghi chú:</label>
                                    </Col>
                                    <Col>
                                        <Field
                                            type="text"
                                            bsSize="lg"
                                            name="details"
                                            id="details"
                                            placeholder="Enter notes"
                                            // component={ReactstrapInput}
                                            render={({ field }) => (
                                                <textarea {...field} id="notes" col="20" rows="5" type="text" placeholder="firstName"></textarea>
                                            )}
                                        />
                                    </Col>
                                </Row>

                            </ModalBody>

                            {/* footer */}
                            <ModalFooter>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    Save
                                </Button>{" "}

                                <Button color="primary" onClick={() => setOpenModalUpdate(false)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik >
            </Modal>

        </Container>
    )
};

const mapGlobalStateToProps = state => {
    return {
        bookings: selectBookings(state),
        page: selectPage(state),
        size: selectSize(state),
        totalSize: selectTotalSize(state),
        selectedRows: selectSelectedRows(state)
    };
};


export default connect(mapGlobalStateToProps, { getListBookingAction, updateSelectedRowsAction })(Booking);

