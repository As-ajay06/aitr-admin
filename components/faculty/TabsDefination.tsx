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
import { setTab, setData } from "../../store/slices/facultySlice"

//import custom components
import Flex from "components/common/Flex";
import TanstackTable from "components/table/TanstackTable";

// todo : import the column here

// todo: need to fetch all the data and from the slices.
import { fetchEventGrants } from "app/api/redux/department/eventGrantSlice";

import { useEffect } from "react"
import axios from "node_modules/axios";

// todo: change this according to tab u are in.
const FacultyTabDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.faculty);

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
                                            <button className="bg-red-200" onClick={() => dispatch(setTab("eventGrant"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Event Grant
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("profile"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Profile
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("researchPaperPublication"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Reaseach paper publication
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("facultyAwardAndPublication"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Awards and Publication
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("facultyDevlopmentPrograms"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Devlopment Programs
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("patentPublished"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Patent Published
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("patentGranted"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Patent Granted
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("professionalCertificationEarned"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Professional certificate Earned
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("membershipProfessionalBodies"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Membership professional bodies
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("phdSupervision"))}>
                                                <DropdownItem as="li" href="#" >
                                                    PhD Supervision/Guided
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("reseachProjectGuided"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Research project guided
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("invitedTalks"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Invited talks
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("booksChapterAuthored"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Books/Chapter Authored
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

export default FacultyTabDefination;

