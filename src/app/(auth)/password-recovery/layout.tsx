import { ReactNode } from "react";

interface RecoveryLayoutProps {
  children: ReactNode;
}

const RecoveryLayout = ({ children }: RecoveryLayoutProps) => {
  return (
    <div className="flex justify-center items-center py-12 bg-radial md:py-0 from-primary via-primary to-primary-accent md:bg-none min-h-svh md:flex-col md:p-9">
      <div className="w-full md:max-w-5xl">{children}</div>
    </div>
  );
};

export default RecoveryLayout;
