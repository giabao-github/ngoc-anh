import { BrandGridView } from "@/components/auth/BrandGridView";
import { RecoveryGridView } from "@/components/auth/RecoveryGridView";
import { Card, CardContent } from "@/components/ui/card";

export const RecoveryView = () => {
  return (
    <div className="flex flex-col gap-4 justify-between h-full md:gap-8">
      <Card className="flex-grow bg-transparent border-0 md:border md:overflow-hidden md:p-0 md:shadow-2xl md:backdrop-blur-sm md:bg-white/60 md:border-neutral-200">
        <CardContent className="grid grid-cols-1 p-0 h-full md:grid-cols-6">
          {/* Left side form */}
          <RecoveryGridView />

          {/* Right side branding */}
          <BrandGridView type="login" />
        </CardContent>
      </Card>
    </div>
  );
};
