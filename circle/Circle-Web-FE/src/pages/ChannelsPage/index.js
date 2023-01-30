import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import theme from "../../config/constants/theme";
import channelApi from "../../api/channelApi";
import ChannelCreate from "../../components/channel/ChannelCreate";
import ChannelEdit from "../../components/channel/ChannelEdit";
import ChannelDelete from "../../components/channel/ChannelDelete";
import { CHANNEL } from "../../config/constants";
import useModal from "../../hooks/useModal";
import useToast from "../../hooks/useToast";

export default function ChannelsPage() {
  const [projects] = useOutletContext();
  const [channelInfos, setChannelInfos] = useState([]);
  const [doUpdate, setDoUpdate] = useState(true);
  const [action, setAction] = useState({ type: "", payload: "" });
  const [Modal, toggleModal] = useModal();
  const [Toast, handleSendToast] = useToast();

  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (doUpdate) {
      const getChannelInfo = async () => {
        try {
          if (!projectId || projectId === "undefined") {
            navigate("/console/projects");
          }

          const data = await channelApi.getChannel(projectId);

          setChannelInfos(data);
          setDoUpdate(false);

          setAction((originAction) => {
            if (originAction.type !== "") {
              handleSendToast(originAction.type);
            }

            return originAction;
          });
        } catch (error) {
          navigate("/error");
        }
      };

      getChannelInfo();
    }
  }, [navigate, projectId, doUpdate, handleSendToast]);

  const projectTitle = projects.find(({ _id }) => _id === projectId)?.title;

  const modalDispatch = ({ type, payload }) => {
    setAction({ type, payload });
    toggleModal();
  };

  const handleOnCreate = (payload = null) => {
    modalDispatch({ type: CHANNEL.CREATE, payload });
  };

  const handleOnEdit = (payload = null) => {
    modalDispatch({ type: CHANNEL.EDIT, payload });
  };

  const handleOnDelete = (payload = null) => {
    modalDispatch({ type: CHANNEL.DELETE, payload });
  };

  const renderModalItem = () => {
    if (action.type === CHANNEL.CREATE) {
      return (
        <ChannelCreate setDoUpdate={setDoUpdate} toggleModal={toggleModal} />
      );
    }

    if (action.type === CHANNEL.EDIT) {
      return (
        <ChannelEdit
          channelInfo={action.payload}
          setDoUpdate={setDoUpdate}
          toggleModal={toggleModal}
        />
      );
    }

    if (action.type === CHANNEL.DELETE) {
      return (
        <ChannelDelete
          channelInfo={action.payload}
          setDoUpdate={setDoUpdate}
          toggleModal={toggleModal}
        />
      );
    }

    return <Navigate to="/404" replace />;
  };

  return (
    <>
      <Container>
        <AddControllerWrapper>
          <AddController
            to="create"
            onClick={handleOnCreate}
            data-testid="channel-create-button"
          >
            <PlusIcon />
            <AddTitle>채널 추가하기</AddTitle>
          </AddController>
        </AddControllerWrapper>
        <TableWrapper>
          <Table>
            <Caption>{projectTitle}</Caption>
            <Header>
              <TableRow>
                <HeaderItem>Channel</HeaderItem>
                <HeaderItem>Description</HeaderItem>
                <HeaderItem>Status</HeaderItem>
                <HeaderItem>Edit</HeaderItem>
                <HeaderItem>Delete</HeaderItem>
              </TableRow>
            </Header>
            <Body>
              {channelInfos.map((channelInfo) => (
                <TableRow key={channelInfo._id}>
                  <BodyItem>{channelInfo.title}</BodyItem>
                  <BodyItem>{channelInfo.description}</BodyItem>
                  <BodyItem>
                    {channelInfo.isActive ? "Active" : "Passive"}
                  </BodyItem>
                  <BodyItem>
                    <EditIcon onClick={() => handleOnEdit(channelInfo)} />
                  </BodyItem>
                  <BodyItem>
                    <DeleteIcon onClick={() => handleOnDelete(channelInfo)} />
                  </BodyItem>
                </TableRow>
              ))}
            </Body>
          </Table>
        </TableWrapper>
      </Container>
      <Modal>{renderModalItem()}</Modal>
      <Toast />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1000px;
  height: 100%;
`;

const AddControllerWrapper = styled.div`
  display: flex;
  width: 80%;
  min-width: 700px;
  margin-bottom: 30px;
`;

const AddController = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: ${theme.gray};
  text-align: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
  }
`;

const PlusIcon = styled(FaPlusCircle)`
  margin-right: 6px;
  border-radius: 50%;
`;

const AddTitle = styled.p``;

const TableWrapper = styled.div`
  height: 70vh;
  background-color: ${theme.gray};
  min-width: 700px;
  width: 80%;
  padding: 50px;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Caption = styled.caption`
  margin-bottom: 50px;
  font-size: 32px;
  font-weight: 800;
  text-shadow: 4px 4px 2px rgba(150, 150, 150, 0.37);
  letter-spacing: 10px;
`;

const Header = styled.thead`
  border-bottom: 1px solid black;
`;

const TableRow = styled.tr``;

const HeaderItem = styled.th`
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  font-size: 24px;
`;

const Body = styled.tbody``;

const BodyItem = styled.td`
  padding: 20px 0px;
  text-align: center;
`;

const EditIcon = styled(FaEdit)`
  width: 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.skyBlue};
  }
`;

const DeleteIcon = styled(FaTrashAlt)`
  width: 20px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.skyBlue};
  }
`;
