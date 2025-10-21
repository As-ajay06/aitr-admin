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
import { setTab, setData } from "../../store/slices/instituteSlice"

//import custom components
import Flex from "components/common/Flex";
import TanstackTable from "components/table/TanstackTable";

// todo : import the column here

// todo: need to fetch all the data and from the slices.

import { useEffect } from "react"
import axios from "node_modules/axios";

// todo: change this according to tab u are in.
const InstituteTabsDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.institute);

    const handleDownload = () => {
        console.log("downloading")
    }

    
    // todo : changes to be made here.
    useEffect(() => {
        const BASE_URL = "http://localhost:3000/api/v1/institute";

        const fetchData = async (currentTab: string) => {
            let url = "";

            switch (currentTab) {
                case "mou":
                    url = `${BASE_URL}/mous`;
                    break;
                case "consultancy":
                    url = `${BASE_URL}/consultancies`;
                    break;
                case "eventGrant":
                    url = `${BASE_URL}/event-grants`;
                    break;
                    // todo: this below route is not working
                case "eventOrganised":
                    url = `${BASE_URL}/events-organised`;
                    break;
                case "instituteDocuments":
                    url = `${BASE_URL}/documents`;
                    break;
                case "rnd":
                    url = `${BASE_URL}/rnds`;
                    break;
                default:
                    console.warn("Unknown tab:", currentTab);
                    return;
            }

            try {
                const res = await axios.get(url);
                const responseData = res.data;
                console.log(responseData);

                // ✅ Dynamically map correct response keys instead of repeating logic
                if (currentTab === "mou") dispatch(setData(responseData.mous));
                if (currentTab === "consultancy") dispatch(setData(responseData.consultancies));
                if (currentTab === "eventGrant") dispatch(setData(responseData.eventGrants));
                if (currentTab === "eventOrganised") dispatch(setData(responseData));
                if (currentTab === "instituteDocuments") dispatch(setData(responseData.instituteDocuments));
                if (currentTab === "rnd") dispatch(setData(responseData.rds));

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        // ✅ Actually call it here (NOT inside itself)
        fetchData(tab);

    }, [tab, dispatch]);


    console.log(columns, columns, "data", data);

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
                                        <DropdownToggle variant="white">Select Cloumn</DropdownToggle>
                                        <DropdownMenu>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("mou"))}>
                                                    Mou
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("consultancy"))} >
                                                    Consultancy
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("rnd"))}>
                                                    R&D
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("eventGrant"))} >
                                                    Event Grant
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("eventOrganised"))}>
                                                    Event organised
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("instituteDocuments"))} >
                                                    Instiute Documents
                                                </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                        <DropdownToggle variant="white">Export</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem as="li" href="#" onClick={handleDownload}>
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
