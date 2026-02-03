import { Navbar } from "./_components/NavBar";
import { OrgSidebar } from "./_components/OrgSidebar";
import { Sidebar } from "./_components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          
          {/* Main Content Area */}
          <div className="h-full flex-1">
            <Navbar />
            
            {/* Gradient Wrapper for Page Content */}
            {/* Uses a very subtle transition from pure white to a faint blue/zinc tint */}
<div className="h-full bg-sky-50 dark:bg-slate-1000">             {children}
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;