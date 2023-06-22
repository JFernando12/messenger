import DesktopSidebar from './DesktopSidebar';

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopSidebar />
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
