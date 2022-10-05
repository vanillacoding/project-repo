import { Link } from "react-router-dom";
import styled from "styled-components";
import SubTitle from "../components/shared/SubTitle";
import Title from "../components/shared/Title";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: auto;
`;

const Code = styled.span`
  background-color: lightgray;
  border-radius: 5px;
  padding: 0 5px 0 5px;
`;

const Section = styled.section`
  margin: 0 20px 0 20px;
`;

const Paragraph = styled.p`
  margin: 20px;
  font-size: 20px;
  font-weight: lighter;

  img {
    width: 1000px;
    border-radius: 10px;
  }
`;

export default function FileLocationDescription() {
  return (
    <Wrapper>
      <Title>Where Is My History ?</Title>

      <Section>
        <Paragraph>
          <img alt="chrome-version" src="images/fileLocationDescription/chrome-version.gif" />
        </Paragraph>
        <SubTitle>
          {"1. Type "}
          <Code>Chrome://version</Code>
          {" on your browser address"}
        </SubTitle>
        <Paragraph>Only Chrome Browser Available Now</Paragraph>
      </Section>
      <Section>
        <SubTitle>2. Check Your “profile path”</SubTitle>
        <Paragraph>
          Mac Example:
          <Code>/users/your_name/library/application support/google/chrome/default</Code>
        </Paragraph>
        <Paragraph>
          Window Example:
          <Code>C:/users/your_name/appData/local/google.chrome/user Data/default/</Code>
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>3. Go To Your PATH & Get Your “History” File</SubTitle>
        <Paragraph>
          <img alt="chrome-version" src="images/fileLocationDescription/chrome-version.png" />
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>
          <Link style={{ textDecoration: "underline" }} to="/">
            4. Upload Your “History” File
          </Link>
        </SubTitle>
      </Section>
    </Wrapper>
  );
}
