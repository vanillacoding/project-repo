import Link from "next/link";
import styled from "styled-components";

const LinkTo = styled.a`
`;

function NextLink({ href, children }) {
  return (
    <Link href={href} passHref>
      <LinkTo>
        {children}
      </LinkTo>
    </Link>
  );
}

export default NextLink;
