import { Link } from "react-router-dom";
import { Card, Avatar, Badge } from "@components/atoms";
import type { User } from "@interface/index";

// Country code to flag emoji mapping
const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷",
  IT: "🇮🇹", ES: "🇪🇸", NL: "🇳🇱", BE: "🇧🇪", CH: "🇨🇭", AT: "🇦🇹",
  DK: "🇩🇰", FI: "🇫🇮", NO: "🇳🇴", SE: "🇸🇪", IE: "🇮🇪", PT: "🇵🇹",
  PL: "🇵🇱", BR: "🇧🇷", MX: "🇲🇽", IN: "🇮🇳", JP: "🇯🇵", CN: "🇨🇳",
  KR: "🇰🇷", TR: "🇹🇷", RU: "🇷🇺", ZA: "🇿🇦", NZ: "🇳🇿", AR: "🇦🇷",
  CL: "🇨🇱", CO: "🇨🇴", PE: "🇵🇪", VN: "🇻🇳", TH: "🇹🇭", ID: "🇮🇩",
  MY: "🇲🇾", PH: "🇵🇭", SG: "🇸🇬", HK: "🇭🇰", TW: "🇹🇼", IR: "🇮🇷",
  SA: "🇸🇦", AE: "🇦🇪", IL: "🇮🇱", EG: "🇪🇬", NG: "🇳🇬", KE: "🇰🇪",
  RS: "🇷🇸", UA: "🇺🇦",
};

const getCountryFlag = (countryCode: string): string => {
  return COUNTRY_FLAGS[countryCode] || "🏳️";
};

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
};
