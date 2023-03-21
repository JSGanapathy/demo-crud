import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
//components
import axios from "../../axios";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
//useTable
const useTable = () => {
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimit, setShowLimit] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  return {
    currentPage,
    showLimit,
    Loading,
    gridApi,
    rowData,
    setCurrentPage,
    setLoading,
    setShowLimit,
    setGridApi,
    setRowData,
  };
};

//function init
const Users = () => {
  //usestate
  const [empID, setEmpID] = useState("");
  const [reload, setreload] = useState(false);
  const [id, setId] = useState("");

  //table
  const EmployeeTable = useTable();
  //get employees

  const fetchdata = async (page = 1) => {
    EmployeeTable.setLoading(true);
    const response = await axios.get(`/api/gets`);
    if (response.status === 200 && response.data) {
      EmployeeTable.setRowData(response.data.data);
    } else {
      EmployeeTable.setRowData([]);
    }
  };
  //useEffect
  useEffect(() => {
    fetchdata();
  }, [reload]);
  //deleteHandler
  const [isdeleteOpen, setIsdeleteOpen] = useState(false);
  const ondeleteClose = () => {
    setIsdeleteOpen(false);
  };
  const cancelRef = useRef();
  const DeleteHandler = async () => {
    ondeleteClose();
    const isDeleted = await axios.delete(`/api/delete/${id}`);
    if (isDeleted) {
      setreload(!reload);
    }
  };

  //edit
  //usestate
  const [iseditopen, setIseditopen] = useState(false);
  const iseditclose = () => {
    setIseditopen(false);
  };
  const editFunction = (id) => {
    setIseditopen(true);
    setEmpID(id);
  };

  return (
    <>
      <Head>
        <title>Demo-Crud-App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 ">
        <div className="flex items-center pb-4">
          <span className="flex-auto text-sky-500 font-bold text-xl">
            Demo-Crud-Application
          </span>
          <div className="flex items-center gap-3">
            <AddUser setreload={setreload} reload={reload} />
          </div>
        </div>
        <div className="border-gray-500 scroll-smooth border">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            colorScheme="whatsapp"
            className="overflow-auto"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th>Name</Th>
                <Th>Mobile Number</Th>
                <Th>E-Mail id</Th>
                <Th>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData != "" ? null : (
                <Tr>
                  <Td
                    style={{ textAlign: "center" }}
                    className="font-semibold"
                    colSpan="7"
                  >
                    No Data Found
                  </Td>
                </Tr>
              )}
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.mobilenumber}</Td>
                    <Td>{item.emailId}</Td>
                    <Td>{item.amount}</Td>
                    <Td>
                      <ButtonGroup spacing="1" onClick={() => setId(item._id)}>
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={() => editFunction(item._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => setIsdeleteOpen(true)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>

        {isdeleteOpen && (
          <AlertDialog
            isOpen={isdeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={ondeleteClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete User
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure? You want to DELETE this user.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={ondeleteClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={DeleteHandler} ml={3}>
                    Disable
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}

        {iseditopen && (
          <EditUser
            iseditopen={iseditopen}
            iseditclose={iseditclose}
            empID={empID}
            setreload={setreload}
            reload={reload}
          />
        )}
      </div>
    </>
  );
};
export default Users;
