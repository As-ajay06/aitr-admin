
export default interface FacultyAwardsAndDevlopment {
    facultyId: string;
    facultyName: string;
    department: string;
    fdpTitle: string;
    programName: string;
    organizingInstitute: string;
    startDate: string;
    endDate: string;
    programType: string;
    mode: 'online'|'offline'|'hybrid';
    location: string;
    numberOfDays: string;
    catagory: string;
    description: string;
    outcomeHighlights: string;
}