'use client';

//import node modules libraries
import {
    Row,
    Col,
    Card,
    CardHeader,
    FormControl,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "react-bootstrap";

// recoil things
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { setTab, setData } from "../../store/slices/departmentSlice"

//import custom components
import Flex from "components/common/Flex";
import TanstackTable from "components/table/TanstackTable";

// todo : import the column here

// todo: need to fetch all the data and from the slices.
import { fetchEventGrants } from "app/api/redux/department/eventGrantSlice";

import { useEffect } from "react"
import axios from "node_modules/axios";

// todo: change this according to tab u are in.
const InstituteTabsDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.institute);

    // todo : changes to be made here.
    useEffect(() => {

        const BASE_URL = "http://localhost:3000"
        const fetchData = async () => {
            let url = "";

            if (tab === "mou") {
                url = `${BASE_URL}/api/v1/department/mou`;
            } else if (tab === "eventGrant") {
                url = `${BASE_URL}/api/v1/department/event-grants-received`;
                try {
                    const res = await axios(url);
                    const data = res.data;
                    console.log("this is data" , data.eventGrants);
                    dispatch(setData(data.eventGrants)); // ✅ update redux with API data
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }

            if (!url) return;
        };

        fetchData();
    }, [tab, dispatch]);

    console.log(columns,"fetched", data)

    return (
        <Row>
            <Col>
                <Card className="card-lg" id="productList">
                    <CardHeader className="border-bottom-0">
                        <Row className="g-4">
                            <Col lg={4}>
                                <FormControl
                                    type="search"
                                    className="listjs-search"
                                    placeholder="Search"
                                />
                            </Col>
                            <Col lg={8} className="d-flex justify-content-end">
                                <Flex alignItems="center" breakpoint="lg" className="gap-2">
                                    <div>
                                        <Button variant="white">More Filter</Button>
                                    </div>
                                    <Dropdown>
                                        <DropdownToggle variant="white">Category</DropdownToggle>
                                        <DropdownMenu>
                                            <button className="bg-red-200" onClick={() => dispatch(setTab("instituteMou"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Mou
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("consultancy"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Consultancy
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("rnd"))}>
                                                <DropdownItem as="li" href="#" >
                                                    R&D
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("eventGrant"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Event Grant
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("eventOrganised"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Event organised
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("instituteDocuments"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Instiute Documents
                                                </DropdownItem>
                                            </button>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                        <DropdownToggle variant="white">Export</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem as="li" href="#">
                                                Download as CSV
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#">
                                                Print
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Flex>
                            </Col>
                        </Row>
                    </CardHeader>

                    {/* i need to re-render this thing when the tab changes */}
                    {/* Product List Table */}
                    <TanstackTable
                        data={data}
                        columns={columns}
                        pagination={true}
                        isSortable
                    />

                </Card>
            </Col>
        </Row >
    );

};

export default InstituteTabsDefination;
