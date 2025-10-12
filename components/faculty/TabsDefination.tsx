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
                                            <button onClick={() => dispatch(setTab("profile"))}>
                                                <DropdownItem as="li" href="#" >
                                                    Profile
                                                </DropdownItem>
                                            </button>
                                            <button onClick={() => dispatch(setTab("reseachPaperPublications"))}>
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

