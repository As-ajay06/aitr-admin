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
import axios from "axios";

// todo: change this according to tab u are in.
const FacultyTabDefination = () => {

    const dispatch = useDispatch();
    const { tab, columns, data } = useSelector((state: RootState) => state.faculty);

    // todo : changes to be made here.
    useEffect(() => {
        const BASE_URL = "http://localhost:3000/api/v1/faculty";

        const fetchData = async (currentTab: string) => {
            let url = "";

            switch (currentTab) {
                case "profile":
                    url = `${BASE_URL}/profiles`;
                    break;
                case "facultyAwardAndPublication":
                    url = `${BASE_URL}/award-recognitions`;
                    break;
                case "facultyDevlopmentPrograms":
                    url = `${BASE_URL}/development-programmes`;
                    break;
                case "patentPublished":
                    url = `${BASE_URL}/patents-published`;
                    break;
                case "patentGranted":
                    url = `${BASE_URL}/patents-granted`;
                    break;
                case "professionalCertificationEarned":
                    url = `${BASE_URL}/professional-certificates`;
                    break;
                case "membershipProfessionalBodies":
                    url = `${BASE_URL}/faculty-membership`;
                    break;
                case "phdSupervision":
                    url = `${BASE_URL}/phd-superviseds`;
                    break;
                case "reseachProjectGuided":
                    url = `${BASE_URL}/research-projects-guided`;
                    break;
                case "reseachPaperPublications":
                    url = `${BASE_URL}/research-papers`;
                    break;
                case "invitedTalks":
                    url = `${BASE_URL}/invited-talks`;
                    break;
                case "booksChapterAuthored":
                    url = `${BASE_URL}/books-authored`;
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
                if (currentTab === "facultyAwardAndPublication") dispatch(setData(responseData));
                if (currentTab === "facultyDevlopmentPrograms") dispatch(setData(responseData.programs));
                if (currentTab === "patentPublished") dispatch(setData(responseData.patents));
                if (currentTab === "patentGranted") dispatch(setData(responseData.eventGrants));
                if (currentTab === "professionalCertificationEarned") dispatch(setData(responseData.certificates));
                if (currentTab === "membershipProfessionalBodies") dispatch(setData(responseData.facultyMembershipData));
                if (currentTab === "phdSupervision") dispatch(setData(responseData.supervisions));
                if (currentTab === "reseachProjectGuided") dispatch(setData(responseData.researchProjects));
                if (currentTab === "reseachPaperPublications") dispatch(setData(responseData.papers));
                if (currentTab === "invitedTalks") dispatch(setData(responseData.talks));
                if (currentTab === "booksChapterAuthored") dispatch(setData(responseData.books));


            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        // ✅ Actually call it here (NOT inside itself)
        fetchData(tab);

    }, [tab, dispatch]);
    console.log(columns, columns, "data", data);

    // Downlading the data ...
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
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("profile"))} >
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("reseachPaperPublications"))} >
                                                    Reaseach paper publication
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("facultyAwardAndPublication"))} >
                                                    Awards and Publication
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("facultyDevlopmentPrograms"))}>
                                                    Devlopment Programs
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("patentPublished"))} >
                                                    Patent Published
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("patentGranted"))}>
                                                    Patent Granted
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("professionalCertificationEarned"))} >
                                                    Professional certificate Earned
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("membershipProfessionalBodies"))} >
                                                    Membership professional bodies
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("phdSupervision"))} >
                                                    PhD Supervision/Guided
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("reseachProjectGuided"))} >
                                                    Research project guided
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("invitedTalks"))}>
                                                    Invited talks
                                                </DropdownItem>
                                                <DropdownItem as="li" href="#" onClick={() => dispatch(setTab("booksChapterAuthored"))}>
                                                    Books/Chapter Authored
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

export default FacultyTabDefination;

