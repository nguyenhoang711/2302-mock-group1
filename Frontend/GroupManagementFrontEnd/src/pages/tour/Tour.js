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
  Input,
  Label
} from "reactstrap";
// import Type from './Type';
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

    let onPriceFilter;
  
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
      // {
      //   dataField: "duration",
      //   text: "Thời gian",
      //   sort: true
      // },
      {
        dataField: "day",
        text: "Số ngày",
        sort: true,
        // filter: customFil
      },
      {
        dataField: "night",
        text: "Số đêm",
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
        dataField: "details",
        text: "Chi tiết",
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
    const [isVisiableFilter, setVisiableFilter] = useState(false);
  
    const handleChangeFilter = (minPrice, maxPrice, minDay, maxDay) => {
      onPriceFilter({
        minPrice,
        maxPrice
      });
      
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

    const [selectUpdateOption, setSelectedUpdateOption] = useState('');

    //update type value
    const handleUpdateOptionChange = event => {
      setSelectedUpdateOption(event.target.value);
    }
  
    const updateTour = async (tourId) => {
      setOpenModalUpdate(true);
      const tourInfo = await TourApi.getById(tourId);
      setSelectedUpdateOption(tourInfo['type']);
      // tourInfo['type'] = Type[tourInfo['type']]
      // if(values.type == 'Tiêu chuẩn') values.type = 'STANDARD';
      // else if (values.type == 'Cao cấp') values.type = 'LUXURY';
      // else if(values.type == 'Tiết kiệm') values.type = 'PAY_LESS';
      // else values.type = 'GOOD_PRICE';
      setTourUpdateInfo(tourInfo);
    }
  
    const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

    const [selectedOptionValue, setSelectedOptionValue] = useState('');

    //create type value
    const handleOptionChange = (event) => {
      setSelectedOptionValue(event.target.value);
    };

    // delete
    const handleOnSelect = (row, isSelect) => {
  
      let selected = props.selectedRows;
  
      if (isSelect) {
        selected = [...props.selectedRows, row.id]
      } else {
        selected = props.selectedRows.filter(x => x !== row.id)
      }

      console.log(selected);
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
        <Modal isOpen={isOpenModalCreate}>
          <Formik
            initialValues={
              {
                name: '',
                price: 0,
                day: 0,
                night: 0,
                numOfPeople: 0,
                type: '',
                startDest: '',
                saleRate: 0.0,
                details: ''
              }
            }
            validationSchema={
              Yup.object({
                name: Yup.string()
                  .min(6, 'Must be between 6 and 400 characters')
                  .max(400, 'Must be between 6 and 400 characters')
                  .required('Required')
                  .test('checkUniqueName', 'This name is already registered.', async name => {
                    // call api
                    const isExists = await TourApi.existsByName(name);
                    // console.log(isExists);
                    return !isExists;
                  }),
                price: Yup.number()
                  .min(0, 'The price always more than 0')
                  .required('Required field'),
                // duration: Yup.string()
                //   .min(0, 'The duration always more than 1 day')
                //   .required('Required field'),
                day: Yup.number()
                  .min(0,'Số ngày luôn lớn hơn 0')
                  .required('Required field'),
                night: Yup.number()
                  .min(0, 'Số đêm luôn lớn hơn 0')
                  .required('Required field'),
                numOfPeople: Yup.number()
                  .min(0, 'The number of people always more than 0')
                  .required('Required field'),
                type: Yup.string()
                  .oneOf(['STANDARD', 'LUXURY', 'GOOD_PRICE', 'PAY_LESS'])
                  .required('Required field'),
                startDest: Yup.string()
                  .min(5, 'Must be greater than 5 characters')
                  .max(50, 'Must be smaller than 50 characters')
                  .required('Required field'),
                saleRate: Yup.number()
                  .min(0, 'Sale rate always more than or equal to zero')
                  .max(100, 'Sale rate always less than 100 percent'),
                details: Yup.string()
                  .required('Required field'),
              })
            }
  
            onSubmit={
              async values => {
                // if(values.type == 'Tiêu chuẩn') values.type = 'STANDARD';
                // else if (values.type == 'Cao cấp') values.type = 'LUXURY';
                // else if(values.type == 'Tiết kiệm') values.type = 'PAY_LESS';
                // else values.type = 'GOOD_PRICE';
                // Object.keys(Type).forEach(k => {if(Type[k] == values.type) {
                //                         values.type = k;
                //                         return;
                //                       }})
                try {
                  console.log(values);
                  await TourApi.create(values.name, values.price,
                    // values.duration, 
                    values.day, values.night,
                    values.numOfPeople, selectedOptionValue,
                    values.startDest, values.saleRate, values.details);
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
              <Form>
                {/* header */}
                <ModalHeader>Create Tour</ModalHeader>
  
                {/* body */}
                <ModalBody className="m-3">
  
                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Tên tour</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="name"
                        placeholder="Nhập tên tour"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Nhập giá tour</label>
                    </Col>
                    <Col>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="price"
                        placeholder="Nhập giá tour/ người"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Label for="type">Hạng tour</Label>
                    <Input 
                      type="select" 
                      name="type" 
                      id="type"
                      value= {selectedOptionValue}
                      onChange={handleOptionChange}
                    >
                        <option value={'STANDARD'}>Tiêu chuẩn</option>
                        <option value={'GOOD_PRICE'}>Giá tốt</option>
                        <option value={'LUXURY'}>Cao cấp</option>
                        <option value={'PAY_LESS'}>Tiết kiệm</option>
                    </Input>
                  </Row>
                  {/* <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Hạng tour</label>
                    </Col>
                    <Col>
                      
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="type"
                        placeholder="Hạng tour"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row> */}

                  <Row style={{ alignItems: "center" }}>
                    {/* <Col lg="auto">
                      <label>Thời gian</label>
                    </Col> */}
                    <Col lg="auto">
                      <label>Số ngày</label>
                    </Col>
                    <Col>
                      {/* <label>Số ngày</label> */}
                      <FastField
                        type="number"
                        bsSize="lg"
                        // name="duration"
                        name="day"
                        placeholder=""
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col lg="auto">
                      <label>Số đêm</label>
                    </Col>
                    <Col>
                      {/* <label>Số đêm</label> */}
                      <FastField
                        type="number"
                        bsSize="lg"
                        // name="duration"
                        name="night"
                        placeholder=""
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Số người</label>
                    </Col>
                    <Col>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="numOfPeople"
                        placeholder="Số lượng khách nhận"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Điểm xuất phát</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="startDest"
                        placeholder="Điểm xuất phát"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Mô tả</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="details"
                        placeholder="Thông tin tour"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>
  
                </ModalBody>
  
                {/* footer */}
                <ModalFooter>
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
        </Modal>
              {/*Update tour form*/}
        <Modal isOpen={isOpenModalUpdate}>
          
          <Formik
            enableReinitialize
            initialValues={
              {
                name: tourUpdateInfo && tourUpdateInfo.name ? tourUpdateInfo.name : '',
                price: tourUpdateInfo && tourUpdateInfo.price !== undefined && tourUpdateInfo.price !== null ? tourUpdateInfo.price : 1000000,
                numOfPeople: tourUpdateInfo && tourUpdateInfo.numOfPeople !== undefined && tourUpdateInfo.numOfPeople !== null ? tourUpdateInfo.numOfPeople: 0,
                // duration: tourUpdateInfo && tourUpdateInfo.duration ? tourUpdateInfo.duration: '',
                day: tourUpdateInfo && tourUpdateInfo.day !== undefined && tourUpdateInfo.day !== null ? tourUpdateInfo.day: 0,
                night: tourUpdateInfo && tourUpdateInfo.night !== undefined && tourUpdateInfo.night !== null ? tourUpdateInfo.night: 0,
                // type: tourUpdateInfo && tourUpdateInfo.type ? tourUpdateInfo.type: '',
                startDest: tourUpdateInfo && tourUpdateInfo.startDest ? tourUpdateInfo.startDest: '',
                details: tourUpdateInfo && tourUpdateInfo.details ? tourUpdateInfo.details: '',
                saleRate: tourUpdateInfo && tourUpdateInfo.saleRate !== undefined && tourUpdateInfo.saleRate != null ? tourUpdateInfo.saleRate : 0
              }
            }
            validationSchema={
              Yup.object({
                name: Yup.string()
                  .min(6, 'Must be between 6 and 400 characters')
                  .max(400, 'Must be between 6 and 400 characters')
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
                  .min(0, 'The price always more than 0')
                  .required('Required field'),
                // duration: Yup.string()
                //   // .min(0, 'The duration always more than 1 day')
                //   .required('Required field'),
                day: Yup.number()
                  .min(0,'Số ngày luôn lớn hơn 0')
                  .required('Required field'),
                night: Yup.number()
                  .min(0, 'Số đêm luôn lớn hơn 0')
                  .required('Required field'),
                numOfPeople: Yup.number()
                  .min(0, 'The number of people always more than 1')
                  .required('Required field'),
                type: Yup.string()
                  .oneOf(['STANDARD', 'LUXURY', 'GOOD_PRICE', 'PAY_LESS'])
                  .required('Required field'),
                startDest: Yup.string()
                  .min(5, 'Must be greater than 5 characters')
                  .max(50, 'Must be smaller than 50 characters')
                  .required('Required field'),
                saleRate: Yup.number()
                  .min(0, 'Sale rate always more than or equal to zero')
                  .max(100, 'Sale rate always less than 100 percent'),
                details: Yup.string()
                  .required('Required field'),
              })
            }
  
            onSubmit={
              async values => {
                // if(values.type == 'Tiêu chuẩn') values.type = 'STANDARD';
                // else if (values.type == 'Cao cấp') values.type = 'LUXURY';
                // else if(values.type == 'Tiết kiệm') values.type = 'PAY_LESS';
                // else values.type = 'GOOD_PRICE';
                
                // Object.keys(Type).forEach(k => {if(Type[k] == values.type) {
                //   values.type = k;
                //   return;
                // }})
                try {
                  await TourApi.update(
                    tourUpdateInfo.id,
                    values.name,values.price,
                    // values.duration, 
                    values.day, values.night,
                    values.startDest,selectUpdateOption, 
                    values.numOfPeople, values.details,
                    values.saleRate
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
          >
            {({ isSubmitting }) => (
              <Form>
           
                {/* header */}
                <ModalHeader>Update Tour</ModalHeader>
                {/* body */}
                <ModalBody className="m-3">
  
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
                      <label>Nhập giá tour</label>
                    </Col>
                    <Col>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="price"
                        placeholder="Nhập giá tour/ người"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  {/* <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Nhập loại tour</label>
                    </Col>
                    <Col> */}
                      {/* <ButtonDropdown isOpen={true}>
                        <DropdownToggle className="bg-secondary">
                          Different Props Applied</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Header Item</DropdownItem>
                          <DropdownItem active>Active Item</DropdownItem>
                          <DropdownItem disabled>Disabled Item</DropdownItem>
                          <DropdownItem divider>Divider Item</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown> */}
                      {/* <FastField
                        type="text"
                        bsSize="lg"
                        name="type"
                        placeholder="Hạng tour"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row> */}

                  <Row>
                    <Label for="type">Hạng tour</Label>
                    <Input 
                      type="select" 
                      name="type" 
                      id="type"
                      value= {selectUpdateOption}
                      onChange={handleUpdateOptionChange}
                    >
                        <option value={'STANDARD'}>Tiêu chuẩn</option>
                        <option value={'GOOD_PRICE'}>Giá tốt</option>
                        <option value={'LUXURY'}>Cao cấp</option>
                        <option value={'PAY_LESS'}>Tiết kiệm</option>
                    </Input>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    {/* <Col lg="auto">
                      <label>Thời gian</label>
                    </Col> */}
                    <Col>
                      <label>Số ngày</label>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="day"
                        placeholder=""
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
                      <label>Số đêm</label>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="night"
                        placeholder=""
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Số người</label>
                    </Col>
                    <Col>
                      <FastField
                        type="number"
                        bsSize="lg"
                        name="numOfPeople"
                        placeholder="Số lượng khách nhận"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Điểm xuất phát</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="startDest"
                        placeholder="Điểm xuất phát"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "center" }}>
                    <Col lg="auto">
                      <label>Mô tả</label>
                    </Col>
                    <Col>
                      <FastField
                        type="text"
                        bsSize="lg"
                        name="details"
                        placeholder="Thông tin tour"
                        component={ReactstrapInput}
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
      tours: selectTours(state),
      page: selectPage(state),
      size: selectSize(state),
      totalSize: selectTotalSize(state),
      selectedRows: selectSelectedRows(state)
    };
  };
  
  export default connect(mapGlobalStateToProps, { getListTourAction, updateSelectedRowsAction })(Tour);