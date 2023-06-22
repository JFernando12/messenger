import Sidebar from '@/app/components/sidebar/Sidebar';

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
}
