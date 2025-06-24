import { BsCloudCheck } from "react-icons/bs";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { Avatars } from "./avatars";

export const DocumentInput = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg px-1.5 cursor-pointer truncate">
          Untitled Document
        </span>
        <BsCloudCheck />
      </div>
      <div className="absolute top-0 right-3 flex gap-3 items-center p-3">
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </div>
  );
};
