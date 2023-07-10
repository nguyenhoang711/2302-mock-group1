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
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { selectGroups, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/GroupSelector";
import { connect } from "react-redux";
import { getListGroupAction, updateSelectedRowsAction } from '../../redux/actions/GroupActions';
import GroupApi from '../../api/GroupApi';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import CustomFilter from "./CustomFilter";
import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { toastr } from "react-redux-toastr";

const Group = (props) => {

  const getListGroup = props.getListGroupAction;
  const size = props.size;
  let onTotalMemberFilter;

  useEffect(() => {
    const getAllGroup = async () => {
      const result = await GroupApi.getAll(1, size);
      const groups = result.content;
      const totalSize = result.totalElements;
      getListGroup(groups, 1, totalSize);
    }
    getAllGroup();
  }, [getListGroup, size]);

  const actionFormatter = (cell, row, rowIndex) => {

    return (
      <Icon.Edit2 size={16} className="align-middle mr-2" onClick={() => updateGroup(row.id)} />
    );
  };

  const tableColumns = [
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "totalMember",
      text: "Total Member",
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) => {
        onTotalMemberFilter = onFilter;
        return null;
      },
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

  const handleTableChange = async (type, { page, sortField, sortOrder, searchText, filters }) => {
    // sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'id'
      sortOrder = 'desc';
    }

    // filter
    const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;

    const result = await GroupApi.getAll(page, size, sortField, sortOrder, searchText, minTotalMember, maxTotalMember);
    const groups = result.content;
    const totalSize = result.totalElements;
    getListGroup(groups, page, totalSize, minTotalMember, maxTotalMember, searchText);
  }

  // filter
  const [isVisiableFilter, setVisiableFilter] = useState(false);

  const handleChangeFilter = (minTotalMember, maxTotalMember) => {
    onTotalMemberFilter({
      minTotalMember,
      maxTotalMember
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
  // update group
  const [groupUpdateInfo, setGroupUpdateInfo] = useState();

  const updateGroup = async (groupId) => {
    setOpenModalUpdate(true);
    const groupInfo = await GroupApi.getById(groupId);
    setGroupUpdateInfo(groupInfo);
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

  const deleteGroup = async () => {
    if (props.selectedRows.length !== 0) {
      try {
        await GroupApi.deleteByIds(props.selectedRows);
        showSuccessNotification(
          "Delete Group",
          "Delete Group Successfully!");
        refreshForm();
      } catch (error) {
        console.log(error);
        // redirect page error server
        props.history.push("/auth/500");
      }
    } else {
      showErrorNotification(
        "Delete Group",
        "You must select groups"
      );
    }
  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Group Management</h1>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.groups}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      {/* Filter */}
                      {isVisiableFilter &&
                        <Row>
                          <Col lg="12">
                            <CustomFilter handleChangeFilter={handleChangeFilter} />
                          </Col>
                        </Row>
                      }
                      {/* Search */}
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="3">
                          <CustomSearch {...toolkitprops.searchProps} />
                        </Col>
                        <Col lg="9">
                          <div className="float-right pull-right">
                            <Icon.Filter size={24} className="align-middle mr-2" onClick={() => setVisiableFilter(!isVisiableFilter)} />
                            <Icon.RefreshCcw className="align-middle mr-2" size={24} onClick={refreshForm} />
                            <Icon.PlusCircle className="align-middle mr-2" size={24} onClick={() => setOpenModalCreate(true)} />
                            <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteGroup} />
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
                        filter={filterFactory()}
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

      <Modal isOpen={isOpenModalCreate}>
        <Formik
          initialValues={
            {
              name: ''
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
                  const isExists = await GroupApi.existsByName(name);
                  return !isExists;
                }),
            })
          }

          onSubmit={
            async values => {
              try {
                await GroupApi.create(values.name);
                // show notification
                showSuccessNotification(
                  "Create Group",
                  "Create Group Successfully!"
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
              <ModalHeader>Create Group</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Group Name:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="name"
                      placeholder="Enter group name"
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
              name: groupUpdateInfo && groupUpdateInfo.name ? groupUpdateInfo.name : '',
              totalMember: groupUpdateInfo && groupUpdateInfo.totalMember !== undefined && groupUpdateInfo.totalMember !== null ? groupUpdateInfo.totalMember : ''
            }
          }
          validationSchema={
            Yup.object({
              name: Yup.string()
                .min(6, 'Must be between 6 and 50 characters')
                .max(50, 'Must be between 6 and 50 characters')
                .required('Required')
                .test('checkUniqueName', 'This name is already registered.', async name => {
                  if (name === groupUpdateInfo.name) {
                    return true;
                  }
                  // call api
                  const isExists = await GroupApi.existsByName(name);
                  return !isExists;
                }),

              totalMember: Yup.number()
                .min(0, 'Must be greater than or equal 0 and integer')
                .integer('Must be greater than or equal 0 and integer')
            })
          }

          onSubmit={
            async values => {
              try {
                await GroupApi.update(
                  groupUpdateInfo.id,
                  values.name,
                  values.totalMember
                );
                // show notification
                showSuccessNotification(
                  "Update Group",
                  "Update Group Successfully!"
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
              <ModalHeader>Update Group</ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Group Name:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="text"
                      bsSize="lg"
                      name="name"
                      placeholder="Enter group name"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>

                <Row style={{ alignItems: "center" }}>
                  <Col lg="auto">
                    <label>Total Member:</label>
                  </Col>
                  <Col>
                    <FastField
                      type="number"
                      bsSize="lg"
                      name="totalMember"
                      placeholder="Enter total member"
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
    groups: selectGroups(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state)
  };
};

export default connect(mapGlobalStateToProps, { getListGroupAction, updateSelectedRowsAction })(Group);