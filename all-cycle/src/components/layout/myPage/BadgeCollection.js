import Badge from "@/components/element/Badge";
import BADGES from "@/constants/badges";
import NextLink from "@/components/element/NextLink";

function BadgeCollection({ userId = "userId", myBadges = [] }) {
  return (
    <>
      {BADGES.map((BADGE, index) => {
        const isinpocket = myBadges.includes(BADGE);

        return (
          <NextLink key={userId + BADGE} href={`/_quiz/${BADGE}`}>
            <Badge
              name={BADGE}
              alt={BADGE}
              width={100}
              height={index === 1 || index === 3 ? 100 : 110}
              isinpocket={String(isinpocket)}
            />
          </NextLink>
        );
      })}
    </>
  );
}

export default BadgeCollection;
