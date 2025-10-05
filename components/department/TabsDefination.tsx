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
import { MoUType } from "./mous/CoulmnDefination";
export const dummyMoUData: MoUType[] = [
    {
        id: "1",
        departmentName: "Computer Science & Engineering",
        agencyName: "AICTE",
        date: "2024-01-15",
        duration: "3 Years",
        description: "Collaboration on AI & ML research projects.",
        funding: "₹10,00,000",
        mouPdf: "/files/mou-cse-aicte.pdf",
        title: "AI & ML Research MoU",
        industryName: "AICTE New Delhi",
        signingDate: "2024-01-15",
        validityPeriod: "2024 - 2027",
        purpose: "Enhance AI research, faculty training, and student internships.",
        supportReceived: "Research Grant and Training Support",
    },
    {
        id: "2",
        departmentName: "Electronics & Communication",
        agencyName: "ISRO",
        date: "2023-11-20",
        duration: "5 Years",
        description: "Satellite communication and IoT application development.",
        funding: "₹25,00,000",
        mouPdf: "/files/mou-ece-isro.pdf",
        title: "Satellite Communication MoU",
        industryName: "ISRO Bengaluru",
        signingDate: "2023-11-20",
        validityPeriod: "2023 - 2028",
        purpose: "Promote research in space technology and IoT.",
        supportReceived: "Research Grant, Lab Equipment",
    },
    {
        id: "3",
        departmentName: "Mechanical Engineering",
        agencyName: "Tata Motors",
        date: "2022-09-10",
        duration: "4 Years",
        description: "Skill development and automotive design training.",
        funding: "₹15,00,000",
        mouPdf: "/files/mou-mech-tatamotors.pdf",
        title: "Automotive Skill Development",
        industryName: "Tata Motors Pune",
        signingDate: "2022-09-10",
        validityPeriod: "2022 - 2026",
        purpose: "Improve mechanical engineering skills & industry readiness.",
        supportReceived: "Internships, Scholarships",
    },
    {
        id: "4",
        departmentName: "Civil Engineering",
        agencyName: "L&T Constructions",
        date: "2023-05-05",
        duration: "3 Years",
        description: "Green building and smart city planning initiatives.",
        funding: "₹12,00,000",
        mouPdf: "/files/mou-civil-lt.pdf",
        title: "Smart City Planning",
        industryName: "L&T Mumbai",
        signingDate: "2023-05-05",
        validityPeriod: "2023 - 2026",
        purpose: "Develop eco-friendly construction methods.",
        supportReceived: "Research Fund, Project Collaboration",
    },
    {
        id: "5",
        departmentName: "Information Technology",
        agencyName: "Google Cloud",
        date: "2024-02-01",
        duration: "2 Years",
        description: "Cloud computing & AI innovation hub setup.",
        funding: "₹20,00,000",
        mouPdf: "/files/mou-it-google.pdf",
        title: "Cloud Innovation MoU",
        industryName: "Google India",
        signingDate: "2024-02-01",
        validityPeriod: "2024 - 2026",
        purpose: "Provide cloud training, certifications, and research support.",
        supportReceived: "Cloud Credits, Training",
    },
];


import { fetchEventGrants } from "app/api/redux/department/eventGrantSlice";
import { useEffect } from "react"
import axios from "node_modules/axios";

const MouTabDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.department);

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
                                            <button onClick={() => dispatch(setTab("eventGrant"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Event Grant
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("mou"))}>
                                                <DropdownItem as="li" href="#" >
                                                    mous
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

