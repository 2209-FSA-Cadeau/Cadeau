"use client"
import UserInfo from "./UserInfo";
import NavigationTabs from "./NavigationTabs";

function RecipientLayout({ children }) {
  return (
    <section className="fixed left-[25%]">
        <UserInfo />
        <NavigationTabs />
        {children}
    </section>
  );
}

export default RecipientLayout;
