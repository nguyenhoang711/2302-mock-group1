import React, { useEffect, useState, useRef } from "react";
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

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectContacts, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/ContactSelector";
import { connect } from "react-redux";
import { getListContactAction, updateSelectedRowsAction } from '../../redux/actions/ContactActions';

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import UserApi from '../../api/UserApi';
import FileApi from '../../api/FileApi';
import ContactApi from '../../api/ContactApi';

import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// import CustomSearch from "./CustomSearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import * as Icon from 'react-feather';
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";

const Contact = (props) => {

  const getListContact = props.getListContactAction;
  const size = props.size;

  // const [userInfo, setUserInfo] = useState({});

  // const [previewAvatarUrl, setPreviewAvatarUrl] = useState();

  // const [previewAvatarFile, setPreviewAvatarFile] = useState();

  useEffect(() => {
    const getAllContact = async () => {
      const result = await ContactApi.getAll(1, size);
      const contacts = result.content;
      const totalSize = result.totalElements;
      getListContact(contacts, 1, totalSize);
    }
    getAllContact();
  }, [getListContact, size]);

  // avatar
  // const avatarInputFile = useRef(null);

  // const onChangeAvatarInput = (e) => {
  //   // Assuming only image
  //   var file = e.target.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onloadend = (e) => {
  //     setPreviewAvatarUrl(reader.result);
  //     setPreviewAvatarFile(file);
  //   };
  // };

  //upload image into server
  // const handleSaveEvent = async () => {
  //   //B1: upload ảnh lên (trả về tên ảnh)
  //   const nameImage = await FileApi.uploadImage(previewAvatarFile);
  //   console.log(nameImage);
  //   // call api update profile
  //   //B2: update info chung lên
  //   await UserApi.updateProfile(nameImage);
  //   showSucessNotification("Change Avatar", "Change avatar successfully!")
  // }

  // const showSucessNotification = (title, message) => {
  //   const options = {
  //     timeOut: 3000,
  //     showCloseButton: false,
  //     progressBar: false,
  //     position: "top-right"
  //   };

  //   // show notification
  //   toastr.success(title, message, options);
  // }

  const actionFormatter = (cell, row, rowIndex) => {

    return (
      <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateContact(row.id)} />
    );
  };

  const tableColumns = [
    {
      dataField: "email",
      text: "Người gửi",
      sort: true
    },
    {
      dataField: "message",
      text: "Thông điệp",
      sort: true,
    },
    {
      dataField: "evidence",
      text: "Ảnh đính kèm",
      sort: true,
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

  const handleTableChange = async (type, { page, sortField, sortOrder}) => {
    // sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'id'
      sortOrder = 'desc';
    }

    const result = await ContactApi.getAll(page, size, sortField, sortOrder);
    const contacts = result.content;
    const totalSize = result.totalElements;
    getListContact(contacts, page, totalSize);
  }

  // refresh form
  const refreshForm = () => {
    // refresh selected rows
    props.updateSelectedRowsAction([]);

    handleTableChange(null,
      {
        page: 1,
        sortField: null,
        sortOrder: null
        // searchText: null
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
  // update contact
  const [contactUpdateInfo, setContactUpdateInfo] = useState();

  const updateContact = async (contactId) => {
    setOpenModalUpdate(true);
    const contactInfo = await ContactApi.getById(contactId);
    setContactUpdateInfo(contactInfo);
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

  const deleteContact = async () => {
    if (props.selectedRows.length !== 0) {
      try {
        await ContactApi.deleteByIds(props.selectedRows);
        showSuccessNotification(
          "Delete Contact",
          "Delete Contact Successfully!");
        refreshForm();
      } catch (error) {
        console.log(error);
        // redirect page error server
        props.history.push("/auth/500");
      }
    } else {
      showErrorNotification(
        "Delete Contact",
        "You must select contacts"
      );
    }
  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Contact Management</h1>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.contacts}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      {/* Search */}
                      {/* <Row style={{ alignItems: "center" }}>
                        <Col lg="3">
                          <CustomSearch {...toolkitprops.searchProps} />
                        </Col>
                        <Col lg="9">
                          <div className="float-right pull-right">
                            <Icon.RefreshCcw className="align-middle mr-2" size={24} onClick={refreshForm} />
                            <Icon.PlusCircle className="align-middle mr-2" size={24} onClick={() => setOpenModalCreate(true)} />
                            <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteContact} />
                          </div>
                        </Col>
                      </Row> */}
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

                {/*Create */}
      <Modal isOpen={isOpenModalCreate}>
        <Formik
          initialValues={
            {
              email: '',
              message: ''
            }
          }
          validationSchema={
            Yup.object({
              email: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required'),
              message: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required') 
            })
          }

          onSubmit={
            async values => {
              try {
                await ContactApi.create(values.email, values.message, values.evidence);
                // show notification
                showSuccessNotification(
                  "Create Contact",
                  "Create Contact Successfully!"
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
              <ModalHeader>Create Contact</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Contact Name:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="name"
                      placeholder="Enter Contact name"
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

      <Modal isOpen={isOpenModalUpdate}>
        <Formik
          enableReinitialize
          initialValues={
            {
              email: contactUpdateInfo && contactUpdateInfo.email ? contactUpdateInfo.email : '',
              message: contactUpdateInfo && contactUpdateInfo.message ? contactUpdateInfo.message : '',
            }
          }
          validationSchema={
            Yup.object({
              email: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required'),

              message: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required'),
            })
          }

          onSubmit={
            async values => {
              try {
                await ContactApi.update(
                  contactUpdateInfo.id,
                  values.email,
                  values.message,
                  values.evidence
                );
                // show notification
                showSuccessNotification(
                  "Update contact",
                  "Update contact Successfully!"
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
              <ModalHeader>Update contact</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Người gửi:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="email"
                      placeholder="Nhập thông tin người gửi"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Thông điệp</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="message"
                      placeholder="Mô tả vấn đề"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                {/* <Row>
                    <Col md="4">
                    <div className="text-center">
                        <img
                        alt="Chris Wood"
                        src={previewAvatarUrl ? previewAvatarUrl : (userInfo.avatarUrl ? `http://127.0.0.1:8887/Avatar/${userInfo.avatarUrl}` : avatar1)}
                        className="rounded-circle img-responsive mt-2"
                        width="300"
                        height="300"
                        />

                        <div className="mt-2">
                        <Button color="primary" onClick={() => avatarInputFile.current.click()}>
                            <FontAwesomeIcon icon={faUpload} /> Upload
                        </Button>
                        <input
                            type='file'
                            id='avatarInput'
                            ref={avatarInputFile}
                            onChange={onChangeAvatarInput}
                            style={{ display: 'none' }} />
                        </div>
                        <small>
                        For best results, use an image at least 300px by 300px in .jpg format
                    </small>
                    </div>
                    </Col>
                </Row> */}

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
    contacts: selectContacts(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default connect(mapGlobalStateToProps, { getListContactAction, updateSelectedRowsAction })(Contact);