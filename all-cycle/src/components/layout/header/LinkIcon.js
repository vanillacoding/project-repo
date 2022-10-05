import { useRouter } from "next/router";

import NextLink from "@/components/element/NextLink";
import StyledIcon from "@/components/element/StyledIcon";

function LinkIcon({ iconName, href, size }) {
  const router = useRouter();

  if (href === "/") {
    const rootPath = router.pathname === "/" ? "#3DD97E" : "#A69E9E";
    return (
      <NextLink href={href}>
        <StyledIcon icon={iconName} color={rootPath} size={size || "2x"} />
      </NextLink>
    );
  }

  const realPath = router.pathname.replace("_", "");
  const index = href.length;
  const color = realPath.slice(0, index) === href ? "#3DD97E" : "#A69E9E";

  return (
    <NextLink href={href}>
      <StyledIcon icon={iconName} color={color} size={size || "2x"} />
    </NextLink>
  );
}

export default LinkIcon;
