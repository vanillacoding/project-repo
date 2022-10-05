import { useSession, getSession } from "next-auth/client";

import fetchData from "@/utils/fetchData";
import AccessDenied from "@/components/element/AccessDenied";
import BadgeCollection from "@/components/layout/myPage/BadgeCollection";
import ReviewList from "@/components/layout/myPage/Reviews";
import PhotoList from "@/components/layout/myPage/Photos";
import {
  Container,
  UserInfo,
  UserProfile,
  UserImage,
  Email,
  Text,
  BadgeContainer,
  Footer,
} from "@/components/layout/myPage/styled/index";

export default function MyPage({ userInfo }) {
  const {
    _id,
    name,
    email,
    image,
    badges,
    pictures,
    reviews,
  } = userInfo;

  const [session] = useSession();

  if (!session) {
    return <AccessDenied />;
  }

  return (
    <Container>
      <UserInfo>
        <UserProfile>
          <UserImage src={image} alt="user profile" />
        </UserProfile>
        <div>
          {name}
          <Email>{email}</Email>
        </div>
      </UserInfo>

      <Text>My Reviews</Text>
      <ReviewList reviews={reviews} />

      <Text>My Photos</Text>
      <PhotoList pictures={pictures} />

      <Text>My Badge Collections</Text>
      <BadgeContainer>
        <BadgeCollection userId={_id} myBadges={badges} />
      </BadgeContainer>

      <Footer>
        <a href="https://www.freepik.com/vectors/badge">Badge vector created by pikisuperstar - www.freepik.com</a>
      </Footer>
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const { email } = session.user;
  const response = await fetchData("GET", `${process.env.HOMEPAGE_URL}/api/user/${email}`);

  return {
    props: {
      userInfo: response.data || {},
    },
  };
}
