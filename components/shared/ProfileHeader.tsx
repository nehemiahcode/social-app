import { Avatar } from "@nextui-org/react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justofy-between">
        <div className="flex items-center gap-3">
          <div className="relative h-fit w-fit object-cover">
            <Avatar
              src={imgUrl}
              size="lg"
              alt="profile Image"
              className=" rounded-full h-36 w-36 object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            {authUserId === "657db9e88f29779e7a3621ea" ? (
              <h1 className="text-left text-heading3-bold text-light-1">
                This User
              </h1>
            ) : (
              <h1 className="text-left text-heading3-bold text-light-1">
                {name}
              </h1>
            )}

            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>
      {/* Todo community*/}

      <p className="mt-6 max-w-lg text-sm text-light-2">{bio}</p>
      <div className="mt-12 h-0 5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
