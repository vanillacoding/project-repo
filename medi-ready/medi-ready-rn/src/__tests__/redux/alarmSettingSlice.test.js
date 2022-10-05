import alarmSettingReducer from "../../redux/reducers/alarmSettingSlice";
import {
  setAlarm,
  saveAlarm,
  getAlarmTime,
  failAlarmSetting,
  completeAlarmSetting,
} from "../../redux/reducers/alarmSettingSlice";

describe("alarm setting slice test", () => {
  it("set alarm", () => {
    const prevState = {
      error: null,
      alarmTimes: {
        morning: "08:00",
        lunch: "12:00",
        dinner: "18:00",
        beforeBed: "22:00",
      },
    };

    const result = alarmSettingReducer(prevState, setAlarm({
      dosePeriod: "morning",
      alarmTime: "09:00",
    }));

    expect(result.error).toEqual(null);
    expect(result.alarmTimes).toEqual({
      morning: "09:00",
      lunch: "12:00",
      dinner: "18:00",
      beforeBed: "22:00",
    });
  });

  it("save alarm", () => {
    const prevState = {
      error: null,
      isLoading: false,
    };

    const result = alarmSettingReducer(prevState, saveAlarm());

    expect(result.error).toEqual(null);
    expect(result.isLoading).toEqual(true);
  });

  it("get alarm time", () => {
    const prevState = {
      error: null,
      isLoading: false,
    };

    const result = alarmSettingReducer(prevState, getAlarmTime());

    expect(result.error).toEqual(null);
    expect(result.isLoading).toEqual(true);
  });

  it("fail alarm setting", () => {
    const prevState = {
      error: null,
      isLoading: true,
    };

    const result = alarmSettingReducer(prevState, failAlarmSetting("test error"));

    expect(result.error).toEqual("test error");
    expect(result.isLoading).toEqual(false);
  });

  it("complete alarm setting", () => {
    const prevState = {
      error: null,
      isLoading: true,
      alarmTimes: {
        morning: "08:00",
        lunch: "12:00",
        dinner: "18:00",
        beforeBed: "22:00",
      },
    };

    const result = alarmSettingReducer(prevState, completeAlarmSetting({
      morning: "09:00",
      lunch: "13:00",
      dinner: "20:30",
      beforeBed: "23:50",
    }));

    expect(result.error).toEqual(null);
    expect(result.isLoading).toEqual(false);
    expect(result.alarmTimes).toEqual({
      morning: "09:00",
      lunch: "13:00",
      dinner: "20:30",
      beforeBed: "23:50",
    });
  });
});
