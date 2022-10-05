import doseHistoryReducer from "../../redux/reducers/doseHistorySlice";
import {
  setDoseHistories,
  updateDoseHistories,
  failDoseHistoryUpdate,
  setSelectedDoseHistory,
} from "../../redux/reducers/doseHistorySlice";

describe("Dose History Slice Test", () => {
  it("set dose histories", () => {
    const prevState = { doseHistoryList: [] };

    const result = doseHistoryReducer(prevState, setDoseHistories([
      {
        before_bed: false,
        date: "2021-09-18",
        dinner: true,
        dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: true,
        morning: false,
      },
      {
        before_bed: false,
        date: "2021-09-19",
        dinner: false,
        dose_history_id: "b6a36df4-6065-4ec4-aec4-3858eff7faee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: false,
        morning: false,
      },
    ]));

    expect(result.doseHistoryList).toEqual([
      {
        before_bed: false,
        date: "2021-09-18",
        dinner: true,
        dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: true,
        morning: false,
      },
      {
        before_bed: false,
        date: "2021-09-19",
        dinner: false,
        dose_history_id: "b6a36df4-6065-4ec4-aec4-3858eff7faee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: false,
        morning: false,
      },
    ]);
  });

  it("update dose histories", () => {
    const prevState = {
      doseHistoryList: [
        {
          before_bed: false,
          date: "2021-09-18",
          dinner: true,
          dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
          fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
          fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
          lunch: true,
          morning: false,
        },
        {
          before_bed: false,
          date: "2021-09-19",
          dinner: false,
          dose_history_id: "b6a36df4-6065-4ec4-aec4-3858eff7faee",
          fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
          fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
          lunch: false,
          morning: false,
        },
      ]
    };

    const result = doseHistoryReducer(prevState, updateDoseHistories({
      doseHistoryId: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
      newDoseHistory: {
        before_bed: false,
        date: "2021-09-18",
        dinner: true,
        dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: false,
        morning: true,
      },
    }));

    expect(result.doseHistoryList).toEqual([
      {
        before_bed: false,
        date: "2021-09-18",
        dinner: true,
        dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: false,
        morning: true,
      },
      {
        before_bed: false,
        date: "2021-09-19",
        dinner: false,
        dose_history_id: "b6a36df4-6065-4ec4-aec4-3858eff7faee",
        fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
        fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
        lunch: false,
        morning: false,
      },
    ]);
  });

  it("fail dose history update", () => {
    const prevState = { error: null };

    const result = doseHistoryReducer(prevState, failDoseHistoryUpdate("test error"));

    expect(result.error).toEqual("test error");
  });

  it("set selected dose history", () => {
    const prevState = { selectedDoseHistory: {} };

    const result = doseHistoryReducer(prevState, setSelectedDoseHistory({
      before_bed: false,
      date: "2021-09-18",
      dinner: true,
      dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
      fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
      fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
      lunch: true,
      morning: false,
    }));

    expect(result.selectedDoseHistory).toEqual({
      before_bed: false,
      date: "2021-09-18",
      dinner: true,
      dose_history_id: "6ebef20f-eb9f-447d-9398-b4fad74faaee",
      fk_patient_id: "98234efe-5077-4e19-b651-45a934b83f67",
      fk_prescription_id: "ba8b7006-4a96-46b9-94f8-16d6cb754f6b",
      lunch: true,
      morning: false,
    });
  });
});
