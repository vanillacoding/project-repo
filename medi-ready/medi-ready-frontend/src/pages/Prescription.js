import { useMutation } from "react-query";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { postPrescription } from "../api";
import { ModalContext } from "../contexts/ModalContext";

import Queue from "../components/Prescription/Queue";

import Loading from "../components/Shared/Loading";
import FlexBox from "../components/Shared/FlexBox";
import Checkbox from "../components/Shared/Checkbox";
import UserInfo from "../components/Prescription/UserInfo";
import { PageTitle, PageContent } from "../components/Base";
import ErrorMessage from "../components/Shared/ErrorMessage";
import InputForm from "../components/Prescription/InputForm";
import SearchForm from "../components/Prescription/SearchForm";
import ConfirmMessage from "../components/Shared/Modal/ConfirmMessage";

const Prescription = () => {
  const { handleModal } = useContext(ModalContext);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [doseTimeList, setDoseTimeList] = useState([]);

  useEffect(() => {
    setDoseTimeList(doseTimeDataList);
  }, []);

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  const { mutate, isLoading } = useMutation(postPrescription, {
    onSuccess({ result }) {
      if (result === "success") {
        handleModal(<ConfirmMessage text="처방전 전송이 완료되었습니다." />);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = (event) => {
    const { id, checked } = event.target;

    if (id === "all") {
      let allCheckedList = doseTimeList.map((time) => {
        return { ...time, isChecked: checked };
      });

      setDoseTimeList(allCheckedList);
    } else {
      let checkedList = doseTimeList.map((time) =>
        time.id === id ? { ...time, isChecked: checked } : time,
      );

      setDoseTimeList(checkedList);
    }
  };

  const handleSubmit = () => {
    const doseTimes = {};

    doseTimeList.forEach(({ isChecked, id }) => {
      if (isChecked) {
        if (id === "beforeBed") {
          return doseTimes["before_bed"] = true;
        }

        doseTimes[id] = true;
      }
    });

    const prescriptionForm = {
      doseTimes,
      medicines: medicineList,
      duration: formData.duration,
      description: formData.description,
      date: new Date().toISOString(),
      patient_id: selectedUser.patient_id,
    };

    if (!selectedUser.name) {
      setError("대기 환자를 선택해주세요.");
      setIsSubmit(false);
      return;
    }

    if (!medicineList.length) {
      setError("처방할 약을 추가해주세요.");
      setIsSubmit(false);
      return;
    }

    if (!Object.keys(doseTimes).length) {
      setError("복용 시간을 체크해주세요.");
      setIsSubmit(false);
      return;
    }

    if (!formData.description) {
      setError("복약지도는 필수 항목입니다.");
      setIsSubmit(false);
      return;
    }

    if (!formData.duration) {
      setError("복용기간을 입력해주세요.");
      setIsSubmit(false);
      return;
    }

    mutate(prescriptionForm);

    setError("");
    setFormData({});
    setIsSubmit(false);
    setSelectedUser({});
    setMedicineList([]);
    setDoseTimeList(doseTimeDataList);
  };

  const doseTimeDataList = [
    { id: "morning", label: "아침", name: "doseTime" },
    { id: "lunch", label: "점심", name: "doseTime" },
    { id: "dinner", label: "저녁", name: "doseTime" },
    { id: "beforeBed", label: "취침전", name: "doseTime" },
  ];

  return (
    <PageContent>
      <PageTitle>Prescription</PageTitle>

      <BoxWrapper>
        <FlexBox>
          <div>
            <UserInfo selectedUser={selectedUser} isSubmit={isSubmit} />
            <SearchForm
              setError={setError}
              medicineList={medicineList}
              setMedicineList={setMedicineList}
            />
          </div>

          <div>
            <CheckboxList>
              <Checkbox
                id="all"
                name="all"
                label="전체"
                checked={doseTimeList.filter(time => time?.isChecked !== true).length < 1}
                onChange={handleChange}
              />
              {doseTimeList.map((time) => {
                const { id, name, label } = time;

                return (
                  <Checkbox
                    key={id}
                    checked={time?.isChecked || false}
                    id={id}
                    name={name}
                    label={label}
                    onChange={handleChange}
                  />
                );
              })}
            </CheckboxList>
          </div>
        </FlexBox>

        <InputForm
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setFormData={setFormData}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </BoxWrapper>

      <BoxWrapper>
        <Queue
          isSubmit={isSubmit}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </BoxWrapper>
    </PageContent>
  );
};

const BoxWrapper = styled.div`
  margin-top: 20px;
  padding: 20px 20px 35px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

const CheckboxList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 430px;
  padding: 0 20px;
  vertical-align: top;
  box-sizing: border-box;

  li:first-child {
    border-right: 1px solid #eee;
  }
`;

export default Prescription;
