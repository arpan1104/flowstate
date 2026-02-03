import JoinedOrganizationList from "./JoinedOrganizationList";
import { NewButton } from "./NewButton";

export const Sidebar = () => {
  return (
<aside className="fixed z-[1] left-0 bg-[#313131] h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">      <JoinedOrganizationList />
      <NewButton />
    </aside>
  );
};