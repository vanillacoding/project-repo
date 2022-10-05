import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 430px;
  height: 180px;
`;

const ProfileImageTool = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 180px;
  height: 180px;
`;

const Image = styled.img`
  position: absolute;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
`;

const UploaderImage = styled.img`
  cursor: pointer;
`;

const ImageUploader = styled.div`
  position: absolute;
  width: 45px;
  height: 40px;
`;

const Uploader = styled.input`
  display: none;
`;

export default function ProfileImage({ imageUrl, canSelectImage = true, changeImage, profileImage }) {
  return (
    <Wrapper>
      <ProfileImageTool>
        <Image src={imageUrl || profileImage} alt="프로필 이미지" width="180" height="180" />
        {canSelectImage &&
          <ImageUploader>
            <label htmlFor="uploader">
              <UploaderImage src="/images/image_uploader_icon.png" alt="이미지 첨부" width="45px" height="40px" />
            </label>
            <Uploader type="file" id="uploader" accept=".png, .jpg, .jpeg" onChange={changeImage} />
          </ImageUploader>
        }
      </ProfileImageTool>
    </Wrapper>
  );
}
