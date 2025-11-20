import { Card, Avatar, Badge } from "@components/atoms";
import type { User } from "@interface/index";

interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
  className?: string;
}

export const UserCard = ({ user, onClick, className = "" }: UserCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;

  return (
    <Card
      padding="md"
      hover={!!onClick}
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
            <p>
              <span className="font-medium">Nationality:</span>{" "}
              <Badge variant="info" size="sm" className="ml-1">
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
  );
};

