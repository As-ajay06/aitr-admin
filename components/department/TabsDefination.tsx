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
import departmentData from "./departmentData";

//import custom components
import Flex from "components/common/Flex";
import TanstackTable from "components/table/TanstackTable";
import { MoUType } from "./mous/CoulmnDefination";

// import { fetchEventGrants } from "app/api/redux/department/eventGrantSlice"; todo: i will think about optimizing this letter
import { useEffect } from "react"
import axios from "axios";

const MouTabDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.department);
    let url;
    useEffect(() => {
    const BASE_URL = "http://localhost:3000";
    const fetchData = async (currentTab: string) => {
        let url = "";

        switch (currentTab) {
            case "mou":
                url = `${BASE_URL}/api/v1/department/mous`;
                break;
            case "eventGrant":
                url = `${BASE_URL}/api/v1/department/event-grants-received`;
                break;
            case "rndInitiatives":
                url = `${BASE_URL}/api/v1/department/rnds`;
                break;
            case "counsultancyProjects":
                url = `${BASE_URL}/api/v1/department/consultancies`;
                break;
            default:
                console.warn("Unknown tab:", currentTab);
                return;
        }

        try {
            const res = await axios.get(url);
            const responseData = res.data; // ✅ rename for clarity

            // ✅ Dispatch based on actual key from backend
            if (currentTab === "mou") dispatch(setData(responseData.mous));
            if (currentTab === "eventGrant") dispatch(setData(responseData.eventGrants));
            if (currentTab === "rndInitiatives") dispatch(setData(responseData.rdInitiatives));
            if (currentTab === "counsultancyProjects") dispatch(setData(responseData.projects));
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    fetchData(tab); // ✅ THIS WAS MISSING

}, [tab, dispatch]);

    console.log(columns, "fetched", data)

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
                                            <button className="bg-red-200" onClick={() => dispatch(setTab("eventGrant"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Event Grant
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("mou"))}>
                                                <DropdownItem as="li" href="#" >
                                                    mous
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("rndInitiatives"))}>
                                                <DropdownItem as="li" href="#" >
                                                    RnD initiatives
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("counsultancyProjects"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Consultancy Projects
                                                </DropdownItem>
                                            </button>
                                            <DropdownItem as="li" href="#">
                                                Men&apos;s Fashion
                                            </DropdownItem>
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

export default MouTabDefination;

