"use client"
import UserInfo from "./UserInfo";
import NavigationTabs from "./NavigationTabs";

function RecipientLayout({ children }) {
  return (
    <section>
        <UserInfo />
        <NavigationTabs />
        {children}
    </section>
  );
}

export default RecipientLayout;
