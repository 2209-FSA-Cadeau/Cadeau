"use client";
import UserInfo from "./UserInfo";
import NavigationTabs from "./NavigationTabs";

function RecipientLayout({ children, params }) {
  return (
    <div className="flex flex-col justify-start w-full h-full">
      <UserInfo />
      <NavigationTabs params={params} />
      <div className="flex flex-col justify-start w-full h-full bg-cadeau-50 rounded-b-md shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default RecipientLayout;

