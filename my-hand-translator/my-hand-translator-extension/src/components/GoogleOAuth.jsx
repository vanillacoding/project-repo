import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Button from "./shared/Button";
import ErrorStyled from "./shared/Error";

import { styled } from "../config/stitches.config";

import { SIGNING_STATUS } from "../constants/user";
import chromeIdentity from "../utils/chromeIdentity";
import chromeStore from "../utils/chromeStore";

const LoginStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "20px 0",
  gap: "15px",
});

export default function GoogleOAuth({ handleOAuth }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [oAuth, setOAuth] = useState({ projectId: "", clientId: "" });

  useEffect(() => {
    const {
      oauth2: { project_id: projectId, client_id: clientId },
    } = chrome.runtime.getManifest();

    if (chrome.runtime.lastError) {
      setErrorMessage(chrome.runtime.lastError.message);
      return;
    }

    if (
      !projectId.trim() ||
      !clientId.trim() ||
      projectId === "YOUR PROJECT ID" ||
      clientId === "YOUR CLIENT ID"
    ) {
      setErrorMessage(
        "필요한 값들이 manifest.json 파일에 입력되지 않았습니다. Example(Window OS): file:///C:/Users/[사용자이름]/AppData/Local/Google/Chrome/User%20Data/Default/Extensions/ 경로에서 설치한 크롬 확장프로그램의 ID를 이름으로 가진 디렉토리에 들어가서 manifest.json 의 oauth에 client_id 와 project_id 키에 유효한 값을 입력해주세요!",
      );
      return;
    }

    setOAuth({ projectId, clientId });
  });

  const handleClickGoogleOAuth = async () => {
    setErrorMessage("");

    try {
      await chromeIdentity.getAccessToken();
      const email = await chromeIdentity.getUserEmail();

      if (!email.trim()) {
        setErrorMessage(
          "이메일 정보가 없습니다. 크롬 브라우저와 구글 계정을 동기화 시켜주세요!",
        );
        handleOAuth(false);
        return;
      }

      const initialUserData = {
        email,
        projectId: oAuth.projectId,
        bucketId: email.replace(/@|\./g, ""),
        name: email.split("@")[0],
        signed: SIGNING_STATUS.NOT_CONFIRMED,
        glossary: null,
        glossaryId: "",
        isServerOn: false,
        translations: [],
      };

      await chromeStore.set("userData", initialUserData);
      handleOAuth(true);
    } catch (error) {
      setErrorMessage(
        `${error}, 현재 ${Object.entries(
          oAuth,
        )}이 manifest.json에 입력되어 있습니다.`,
      );
      handleOAuth(false);
    }
  };

  const isOAuthAvailable = !errorMessage && oAuth.projectId && oAuth.clientId;

  return (
    <LoginStyled>
      {errorMessage && (
        <ErrorStyled>
          {errorMessage}{" "}
          <div>
            <a
              target="_blank"
              href="https://my-hand-translator.github.io/#/get-started"
              rel="noreferrer"
            >
              OAuth2 입력 방법 알아보기
            </a>
          </div>
        </ErrorStyled>
      )}

      <Button
        active={isOAuthAvailable}
        type="button"
        onClick={handleClickGoogleOAuth}
        css={{
          padding: "10px 15px",
        }}
      >
        구글로 OAuth2 인증 받기
      </Button>

      {!errorMessage && (
        <a
          target="_blank"
          href="https://my-hand-translator.github.io/#/get-started"
          rel="noreferrer"
        >
          OAuth2 입력 방법 알아보기
        </a>
      )}
    </LoginStyled>
  );
}

GoogleOAuth.propTypes = {
  handleOAuth: PropTypes.func.isRequired,
};
