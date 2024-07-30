interface AppLayoutsProps {
  children: React.ReactNode[];
}

const AppLayout = ({ children }: AppLayoutsProps) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {children}
    </div>
  );
};
export default AppLayout;
