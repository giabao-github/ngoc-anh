import { BrandGridView } from "@/components/auth/BrandGridView";
import { ChangePasswordGridView } from "@/components/auth/ChangePasswordGridView";
import { Card, CardContent } from "@/components/ui/card";

interface ChangePasswordViewProps {
  email: string;
}

export const ChangePasswordView = ({ email }: ChangePasswordViewProps) => {
  return (
    <div className="flex flex-col gap-4 justify-between h-full md:gap-8">
      <Card className="flex-grow bg-transparent border-0 md:border md:overflow-hidden md:p-0 md:shadow-2xl md:backdrop-blur-sm md:bg-white/60 md:border-neutral-200">
        <CardContent className="grid grid-cols-1 p-0 h-full md:grid-cols-9">
          {/* Left side form */}
          <ChangePasswordGridView email={email} />

          {/* Right side branding */}
          <BrandGridView type="register" />
        </CardContent>
      </Card>
    </div>
  );
};
