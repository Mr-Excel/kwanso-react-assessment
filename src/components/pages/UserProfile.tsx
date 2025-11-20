import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppSelector, selectUserById } from "@store";
import { Avatar, Badge, Card, Button } from "@components/atoms";
import { getCountryFlag } from "@constants/userProfile";

export const UserProfile = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  // Get user from Redux store (users are stored when fetched from listing page)
  // Note: We don't fetch from API using UUID because UUID as seed doesn't work correctly
  // The Random User API doesn't support direct UUID lookup - seeds return different users
  const user = useAppSelector((state) =>
    uuid ? selectUserById(uuid)(state) : undefined
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card padding="lg" className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            User Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            This user profile is not available. Please navigate to the profile
            from the user listing page.
          </p>
          <Button onClick={() => navigate("/")} variant="primary">
            Back to Listing
          </Button>
        </Card>
      </div>
    );
  }

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const fullAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`;
  const mapUrl = `https://www.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Back to Listing
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card padding="lg" className="mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar
              src={user.picture.large}
              alt={fullName}
              size="xl"
              className="mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                <span className="text-4xl" role="img" aria-label={user.nat}>
                  {getCountryFlag(user.nat)}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Badge
                  variant={user.gender === "male" ? "primary" : "danger"}
                  size="md"
                >
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </Badge>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{user.dob.age} years old</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  @{user.login.username}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card padding="lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900 font-medium">{fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900 font-medium">
                  {new Date(user.dob.date).toLocaleDateString()} ({user.dob.age}{" "}
                  years old)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <Badge
                  variant={user.gender === "male" ? "primary" : "danger"}
                  className="mt-1"
                >
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl" role="img" aria-label={user.nat}>
                    {getCountryFlag(user.nat)}
                  </span>
                  <span className="text-gray-900 font-medium">{user.nat}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registered</p>
                <p className="text-gray-900 font-medium">
                  {new Date(user.registered.date).toLocaleDateString()} (
                  {user.registered.age} years ago)
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card padding="lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {user.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href={`tel:${user.phone}`}
                  className="text-gray-900 font-medium hover:text-blue-600"
                >
                  {user.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cell</p>
                <a
                  href={`tel:${user.cell}`}
                  className="text-gray-900 font-medium hover:text-blue-600"
                >
                  {user.cell}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900 font-medium">{fullAddress}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Location with Google Maps */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">{fullAddress}</p>
            <p className="text-sm text-gray-500">
              Coordinates: {user.location.coordinates.latitude},{" "}
              {user.location.coordinates.longitude}
            </p>
            <p className="text-sm text-gray-500">
              Timezone: {user.location.timezone.offset} -{" "}
              {user.location.timezone.description}
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
            {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                }&q=${user.location.coordinates.latitude},${
                  user.location.coordinates.longitude
                }&zoom=15`}
                title={`Location of ${fullName}`}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600 mb-2 font-medium">
                  Google Maps API Key not configured
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Add VITE_GOOGLE_MAPS_API_KEY to your .env file to enable maps
                </p>
              </div>
            )}
            <div className="mt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-gray-900 font-medium">
                @{user.login.username}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="text-gray-900 font-medium text-xs font-mono">
                {user.login.uuid}
              </p>
            </div>
            {user.id.value && (
              <div>
                <p className="text-sm text-gray-500">ID ({user.id.name})</p>
                <p className="text-gray-900 font-medium">{user.id.value}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
