
// atoms/tableAtom.ts
import { atom, selector } from "recoil";
import { MouColumns } from "components/department/mous/CoulmnDefination";
import { EventGrantColumns } from "components/department/eventGrant/ColumnDefination";
import { dummyMoUData, eventGrantData } from "components/department/TabsDefination";


export const department = atom<string>({
  key: "department",
  default: "mou", // start with MoU
});

// This selector returns columns + data based on the current tab
export const departmentSelector = selector({
  key: "departmentSelector",
  get: ({ get }) => {
    const tab = get(department);
    switch (tab) {
      case "eventGrant":
        return { table: EventGrantColumns, Tabledata: eventGrantData };
      case "mou":
        return { table: MouColumns, Tabledata: dummyMoUData }
      default:
        // fallback if tab value doesn't match
        return { columns: [], data: [] };
    }
  },
});
  