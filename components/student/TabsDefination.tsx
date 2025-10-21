
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
        const BASE_URL = "http://localhost:3000/api/v1/students";
        let url = "";

        const fetchData = async (currentTab: string) => {

            switch (currentTab) {
                case "profile":
                    url = `${BASE_URL}/profiles`;
                    break;
                case "certification":
                    url = `${BASE_URL}/memberships`;
                    break;
                case "technicalNontechnicalCompetition":
                    url = `${BASE_URL}/technicalNontechnical`;
                    break;
                case "placement":
                    url = `${BASE_URL}/placements`;
                    break;
                case "internship":
                    url = `${BASE_URL}/patents-granted`;
                    break;
                case "researchPaper":
                    url = `${BASE_URL}/research-papers`;
                    break;
                case "sports":
                    url = `${BASE_URL}/sports`;
                    break;
                case "extraCurricular":
                    url = `${BASE_URL}/extracurriculars`;
                    break;
                case "projectWorkCapstoneProjects":
                    url = `${BASE_URL}/research-projects-guided`;
                    break;
                case "startupsVentures":
                    url = `${BASE_URL}/startups`;
                    break;
                case "hackathonInnovationChallages":
                    url = `${BASE_URL}/hackathons`;
                    break;
                case "highreStudies":
                    url = `${BASE_URL}/higher-studies`;
                    break;
                case "professionalMembership":
                    url = `${BASE_URL}/memberships`;
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
                if (currentTab === "profile") dispatch(setData(responseData.profiles));
                if (currentTab === "certification") dispatch(setData(responseData.membershipCertificates));
                if (currentTab === "technicalNontechnicalCompetition") dispatch(setData(responseData.technicalData));
                if (currentTab === "placement") dispatch(setData(responseData.placements));
                if (currentTab === "internship") dispatch(setData(responseData.eventGrants));
                if (currentTab === "researchPaper") dispatch(setData(responseData.researchPapers));
                if (currentTab === "sports") dispatch(setData(responseData.sportsData));
                if (currentTab === "extraCurricular") dispatch(setData(responseData.extraCurriculars));
                if (currentTab === "projectWorkCapstoneProjects") dispatch(setData(responseData.researchProjects));
                if (currentTab === "startupsVentures") dispatch(setData(responseData.startupsData));
                if (currentTab === "hackathonInnovationChallages") dispatch(setData(responseData.hackathons));
                if (currentTab === "highreStudies") dispatch(setData(responseData.higherStudies));
                if (currentTab === "professionalMembership") dispatch(setData(responseData.membershipCertificates));

                // professionalMembership

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        // ✅ Actually call it here (NOT inside itself)
        fetchData(tab);

    }, [tab, dispatch]);

    console.log(columns, "fetched", data)



    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

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
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("profile"))}>
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("certification"))} >
                                                Certification
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("technicalNontechnicalCompetition"))} >
                                                Technical/Non-technical competition
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("placement"))}>
                                                Placement
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("internship"))}>
                                                Internship
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("researchPaper"))} >
                                                Research Paper
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("sports"))}>
                                                Sports
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("extraCurricular"))} >
                                                Extra Curricular
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("projectWorkCapstoneProjects"))} >
                                                Projects work / Capstone Projects
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("startupsVentures"))} >
                                                Startups/Entrepreneurial Ventures
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("hackathonInnovationChallages"))} >
                                                Hacathons/Innovation Challenges
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("highreStudies"))} >
                                                Higher Studies
                                            </DropdownItem>
                                            <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("professionalMembership"))} >
                                                Professional Membership
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                        <DropdownToggle variant="white">Export</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem as="li" href="#" onClick={() => downloadCSV(data)}>
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

