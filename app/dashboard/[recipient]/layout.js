"use client"
import UserInfo from "./UserInfo";
import NavigationTabs from "./NavigationTabs";

function RecipientLayout({ children, params }) {
  return (
    <div className="">
        <UserInfo />
        <NavigationTabs params={params} />
        {children}
    </div>
  );
}

export default RecipientLayout;
