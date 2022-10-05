import React, { useEffect } from "react";
import { useQuery } from "react-query";

import PropTypes from "prop-types";
import styled from "styled-components";

import { getQueue } from "../../api";

import Badge from "../../components/Shared/Badge";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";

const Queue = ({ isSubmit, selectedUser, setSelectedUser }) => {
  const { data, error, isError, isLoading, refetch } = useQuery("queue", getQueue);

  useEffect(() => {
    if (isSubmit) {
      refetch();
    }
  }, [isSubmit]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const { people } = data;

  const handleUser = (event) => {
    event.preventDefault();

    const { name, picture } = event.currentTarget.dataset;
    let patient_id = null;

    people.forEach((info) => {
      if (info.user.name === name) {
        patient_id = info.patient_id;
      }
    });

    const selectedUser = {
      name,
      picture,
      patient_id,
      waiting: false,
    };

    setSelectedUser(selectedUser);
  };

  return (
    <Wrapper>
      <Title>Waiting List</Title>

      <ul>
        {people?.map((data, index) => {
          const { name, picture } = data.user;

          return (
            <li key={name, index}>
              <a href="#"
                onClick={handleUser}
                data-picture={picture}
                data-name={name}
              >
                <img alt={name} src={picture} />
                <b>{name}</b>
                {selectedUser.name !== name ? (
                  <Badge>Waiting</Badge>
                ) : (
                  <Badge color="green">Treating</Badge>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

Queue.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  padding-top: 10px;

  ul {
    padding-top: 5px;

    li {
      position: relative;
      border-bottom: 1px solid #EEE;

      em {
        top: 23px;
      }
    }
  }

  a {
    display: block;
    padding: 15px 0;

      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }

  b {
    margin-left: 20px;
    font-size: 14px;
  }

  span {
    display: inline-block;
    margin-left: 50px;
    color: #767676;
    font-size: 14px;
  }

  em {
    position: absolute;
    right: 10px;
  }
`;

export default Queue;
