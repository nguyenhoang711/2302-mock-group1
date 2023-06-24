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
} from "reactstrap";
// import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectTours, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/TourSelector";
import { connect } from "react-redux";
import { getListTourAction, updateSelectedRowsAction } from '../../redux/actions/TourActions';
import TourApi from '../../api/TourApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
// import CustomFilter from "./CustomFilter";
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";

const Tour = (props) => {

    const getListTour = props.getListTourAction;
    const size = props.size;
  
    useEffect(() => {
      const getAllTour = async () => {
        const result = await TourApi.getAll(1, size);
        const tours = result.content;
        const totalSize = result.totalElements;
        getListTour(tours, 1, totalSize);
      }
      getAllTour();
    }, [getListTour, size]);
  
    const actionFormatter = (cell, row, rowIndex) => {
  
      return (
        <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateTour(row.id)} />
      );
    };
  
    const tableColumns = [
      {
        dataField: "name",
        text: "Name",
        sort: true
      },
      {
        dataField: "price",
        text: "Giá",
        sort: true,
        // filter: customFilter(),
        // filterRenderer: (onFilter, column) => {
        //   onPriceFilter = onFilter;
        //   return null;
        // },
      },
      {
        dataField: "duration",
        text: "Thời gian",
        sort: true
      },
      {
        dataField: "startDest",
        text: "Điểm khởi hành",
        sort: true
      },
      {
        dataField: "type",
        text: "Hạng tour",
        sort: true
      },
      {
        dataField: "numOfPeople",
        text: "Số chỗ còn nhận",
        sort: true
      },
      {
        dataField: "saleRate",
        text: "Giảm giá",
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
  
    const handleTableChange = async (type, { page, sortField, sortOrder, searchText, filters}) => {
      // sort
      if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
        sortField = 'id'
        sortOrder = 'desc';
      }
  
      // filter
      const filter = filters && filters.price && filters.price.filterPrice ? filters.price.filterVal : null;
      const minPrice = filter && filter.minPrice ? filter.minPrice : null;
      const maxPrice = filter && filter.maxPrice ? filter.maxPrice : null;
  
      const result = await TourApi.getAll(page, size, sortField, sortOrder, searchText);
      const tours = result.content;
      const totalSize = result.totalElements;
      getListTour(tours, page, totalSize, minPrice, maxPrice, searchText);
    }
  
    // filter
    // const [isVisiableFilter, setVisiableFilter] = useState(false);
  
    // const handleChangeFilter = (minPrice, maxPrice) => {
    //   onPriceFilter({
    //     minPrice,
    //     maxPrice
    //   });
    // }
  
    // refresh form
    const refreshForm = () => {
      // refresh selected rows
      props.updateSelectedRowsAction([]);
  
      handleTableChange(null,
        {
          page: 1,
          sortField: null,
          sortOrder: null,
          searchText: null,
          filters: null
        }
      );
    }
  
    // create
    const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  
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
    // update tour
    const [tourUpdateInfo, setTourUpdateInfo] = useState();
  
    const updateTour = async (tourId) => {
      setOpenModalUpdate(true);
      const tourInfo = await TourApi.getById(tourId);
      setTourUpdateInfo(tourInfo);
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
  
    const deleteTour = async () => {
      if (props.selectedRows.length !== 0) {
        try {
          await TourApi.deleteByIds(props.selectedRows);
          showSuccessNotification(
            "Delete Tour",
            "Delete Tour Successfully!");
          refreshForm();
        } catch (error) {
          console.log(error);
          // redirect page error server
          props.history.push("/auth/500");
        }
      } else {
        showErrorNotification(
          "Delete Tour",
          "You must select tours"
        );
      }
    }
  
    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Tour Management</h1>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  data={props.tours}
                  columns={tableColumns}
                  search
                >
                  {
                    toolkitprops => (
                      <>
                        {/* Filter */}
                        {/* {isVisiableFilter &&
                          <Row>
                            <Col lg="12">
                              <CustomFilter handleChangeFilter={handleChangeFilter} />
                            </Col>
                          </Row>
                        } */}
                        {/* Search */}
                        <Row style={{ alignItems: "center" }}>
                          <Col lg="3">
                            <CustomSearch {...toolkitprops.searchProps} />
                          </Col>
                          <Col lg="9">
                            <div className="float-right pull-right">
                              {/* <Icon.Filter size={24} className="align-middle mr-2" onClick={() => setVisiableFilter(!isVisiableFilter)} /> */}
                              <Icon.RefreshCcw className="align-middle mr-2" size={24} onClick={refreshForm} />
                              <Icon.PlusCircle className="align-middle mr-2" size={24} onClick={() => setOpenModalCreate(true)} />
                              <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteTour} />
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
                          // filter={filterFactory()}
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
                  
        {/*Validate create tour form */}
        {/* <Modal isOpen={isOpenModalCreate}>
          <Formik
            initialValues={
              {
                name: '',
                price: 0,
                duration: 1,
                numOfPeople: 10,
                type: 'Tiêu chuẩn',
                startDest: '',
                saleRate: 0.0,
                details: 'thông tin chi tiết'
              }
            }
            validationSchema={
              Yup.object({
                name: Yup.string()
                  .min(6, 'Must be between 6 and 50 characters')
                  .max(50, 'Must be between 6 and 50 characters')
                  .required('Required')
                  .test('checkUniqueName', 'This name is already registered.', async name => {
                    // call api
                    const isExists = await TourApi.existsByName(name);
                    return !isExists;
                  }),
                price: Yup.number()
                  .min(0, 'The price always more than 0')
                  .required('Required field'),
                duration: Yup.string()
                  // .min(0, 'The duration always more than 1 day')
                  .required('Required field'),
                numOfPeople: Yup.number()
                  .min(0, 'The number of people always more than 1')
                  .required('Required field'),
                type: Yup.string()
                  .oneOf('Tiêu chuẩn', 'Cao cấp', 'Tiết kiệm', 'Giá tốt')
                  .required('Required field'),
                startDest: Yup.string()
                  .min(5, 'Must be greater than 5 characters')
                  .max(40, 'Must be smaller than 40 characters')
                  .required('Required field'),
                saleRate: Yup.number()
                  .min(0.0, 'Sale rate always more than or equal to zero')
                  .max(100, 'Sale rate always less than 100 percent'),
                details: Yup.string()
                  .required('Required field'),
              })
            }
  
            onSubmit={
              async values => {
                try {
                  await TourApi.create(values.name);
                  // show notification
                  showSuccessNotification(
                    "Create Tour",
                    "Create Tour Successfully!"
                  );
                  // close modal
                  setOpenModalCreate(false);
                  // Refresh table
                  refreshForm();
                } catch (error) {
                  console.log(error);
                  setOpenModalCreate(false);
                  // redirect page error server
                  props.history.push("/auth/500");
                }
              }
            }
  
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ isSubmitting }) => (
              <Form> */}
                {/* header */}
                {/* <ModalHeader>Create Tour</ModalHeader> */}
  
                {/* body */}
                {/* <ModalBody className="m-3">
  
                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Tour Name:</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="name"
                        placeholder="Enter Tour name"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>
  
                </ModalBody>
   */}
                {/* footer */}
                {/* <ModalFooter>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Save
                  </Button>{" "}
  
                  <Button color="primary" onClick={() => setOpenModalCreate(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik >
        </Modal> */}
              {/*Update tour form*/}
        {/* <Modal isOpen={isOpenModalUpdate}>
          <Formik
            enableReinitialize
            initialValues={
              {
                name: tourUpdateInfo && tourUpdateInfo.name ? tourUpdateInfo.name : '',
                price: tourUpdateInfo && tourUpdateInfo.price !== undefined && tourUpdateInfo.price !== null ? tourUpdateInfo.price : 1000000,
                numOfPeople: tourUpdateInfo && tourUpdateInfo.numOfPeople !== undefined && tourUpdateInfo.numOfPeople != null ? tourUpdateInfo: 10
              }
            }
            validationSchema={
              Yup.object({
                name: Yup.string()
                  .min(6, 'Must be between 6 and 50 characters')
                  .max(50, 'Must be between 6 and 50 characters')
                  .required('Required')
                  .test('checkUniqueName', 'This name is already registered.', async name => {
                    if (name === tourUpdateInfo.name) {
                      return true;
                    }
                    // call api
                    const isExists = await TourApi.existsByName(name);
                    return !isExists;
                  }),
  
                price: Yup.number()
                  .min(0, 'Must be greater than or equal 0 and integer'),
                  // .integer('Must be greater than or equal 0 and integer')
                
              })
            } */}
  
            {/* onSubmit={
              async values => {
                try {
                  await TourApi.update(
                    tourUpdateInfo.id,
                    values.name,
                    values.price
                  );
                  // show notification
                  showSuccessNotification(
                    "Update Tour",
                    "Update Tour Successfully!"
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
          > */}
            {/*{({ isSubmitting }) => (
              <Form>
            */}
                {/* header */}
                {/* <ModalHeader>Update Tour</ModalHeader> */}
  
                {/* body */}
                {/* <ModalBody className="m-3">
  
                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Tour</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="name"
                        placeholder="Enter tour name"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>
  
                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Giá từng người</label>
                    </Col>
                    <Col>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="price"
                        placeholder="Enter price for each person"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>
  
                </ModalBody> */}
  
                {/* footer */}
                {/* <ModalFooter>
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
        </Modal> */}
  
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
  
  export default connect(mapGlobalStateToProps, { getListTourAction, updateSelectedRowsAction })(Tour);