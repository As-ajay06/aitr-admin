
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
import { setTab, setData } from "../../store/slices/studentSlice"

//import custom components
import Flex from "components/common/Flex";
import TanstackTable from "components/table/TanstackTable";

// todo : import the column here

// todo: need to fetch all the data and from the slices.
import { fetchEventGrants } from "app/api/redux/department/eventGrantSlice";

import { useEffect } from "react"
import axios from "node_modules/axios";

// todo: change this according to tab u are in.
const StudentTabDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.student);

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
                                            <button className="bg-red-200" onClick={() => dispatch(setTab("profile"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Profile
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("certification"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Certification
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("technicalNontechnicalCompetition"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Technical/Non-technical competition
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("placement"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Placement
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("internship"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Internship
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("researchPaper"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Research Paper
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("sports"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Sports
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("extraCurricular"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Extra Curricular
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("projectWorkCapstoneProjects"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Projects work / Capstone Projects
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("startupsVentures"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Startups/Entrepreneurial Ventures
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("hackathosInnovationChallages"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Hacathons/Innovation Challenges
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("highreStudies"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Higher Studies
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("professionalMembership"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Professional Membership
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

export default StudentTabDefination;

