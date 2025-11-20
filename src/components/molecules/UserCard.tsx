import { memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Badge } from "@components/atoms";
import type { User } from "@interfaces/index";
import { getCountryFlag } from "@constants/userProfile";

interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
  className?: string;
}

export const UserCard = memo(({ user, onClick, className = "" }: UserCardProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(user);
    }
  }, [onClick, user]);

  const fullName = useMemo(
    () => `${user.name.title} ${user.name.first} ${user.name.last}`,
    [user.name.title, user.name.first, user.name.last]
  );

  const location = useMemo(
    () => `${user.location.city}, ${user.location.state}, ${user.location.country}`,
    [user.location.city, user.location.state, user.location.country]
  );

  return (
    <Link to={`/user/${user.login.uuid}`} className="block">
      <Card
        padding="md"
        hover={true}
        onClick={handleClick}
        className={className}
      >
        <div className="flex gap-4">
          <Avatar
            src={user.picture.medium}
            alt={fullName}
            size="lg"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {fullName}
                </h3>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
              <Badge variant={user.gender === "male" ? "primary" : "danger"}>
                {user.gender}
              </Badge>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p className="truncate">
                <span className="font-medium">Location:</span> {location}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-medium">Cell:</span> {user.cell}
              </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Nationality:</span>
              <span className="text-lg" role="img" aria-label={user.nat}>
                {getCountryFlag(user.nat)}
              </span>
              <Badge variant="info" size="sm">
                {user.nat}
              </Badge>
            </p>
              <p>
                <span className="font-medium">Age:</span> {user.dob.age} years
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if user data actually changed
  // Compare by UUID and key user properties to avoid unnecessary re-renders
  return (
    prevProps.user.login.uuid === nextProps.user.login.uuid &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.user.name.first === nextProps.user.name.first &&
    prevProps.user.name.last === nextProps.user.name.last &&
    prevProps.className === nextProps.className &&
    prevProps.onClick === nextProps.onClick
  );
});

UserCard.displayName = "UserCard";
