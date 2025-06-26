"use client";

import { useState } from "react";

import {
  KeyRound,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Shield,
  User,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UserAvatar } from "@/components/sections/header/UserAvatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { lexend } from "@/config/fonts";

import { TEXTS } from "@/constants/texts";

import useIsMobile from "@/hooks/useIsMobile";

import { authClient } from "@/lib/auth-client";

import { cn } from "@/utils/styleUtils";

interface UserCardProps {
  className?: string;
}

export const UserCard = ({ className = "" }: UserCardProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = authClient.useSession();

  const userName = data?.user.name;
  const userEmail = data?.user.email;

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          console.error("Logout failed:", error);
          toast.error("Đăng xuất không thành công", {
            description: "Vui lòng thử lại hoặc tải lại trang",
          });
        },
      },
    });
  };

  if (isPending) {
    return (
      <Skeleton
        className="w-10 h-10 rounded-full 2xl:w-12 2xl:h-12"
        aria-label="Loading user avatar"
      />
    );
  }

  // Authenticated user card
  if (data?.user) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "relative p-0 w-10 h-10 2xl:w-12 2xl:h-12 rounded-full transition-all duration-200",
              className,
              isOpen ? "ring-2 ring-[#D4AF37]" : "",
            )}
            aria-label="User menu"
          >
            <UserAvatar user={data.user} />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background md:animate-pulse" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0 w-[250px] md:w-80 border-0 shadow-xl backdrop-blur-sm duration-200 animate-in slide-in-from-top-2",
            lexend.className,
          )}
          align="end"
          sideOffset={8}
        >
          <Card className="gap-y-4 pt-5 pb-3 border-0 shadow-none">
            <CardHeader className="px-4 md:px-6">
              <div className="flex gap-3 items-center">
                <UserAvatar
                  user={data.user}
                  size={isMobile ? "md" : "lg"}
                  className="ring ring-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-lg font-semibold truncate">
                      {userName}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300"
                    >
                      {TEXTS.online}
                    </Badge>
                  </div>
                  <div className="flex gap-1 justify-center items-center text-sm text-muted-foreground w-fit">
                    <Mail className="size-3.5" />
                    <p className="truncate">{userEmail}</p>
                  </div>
                  <div className="flex gap-1 items-center mt-1 text-xs text-muted-foreground w-fit">
                    <Shield className="w-3 h-3" />
                    <p>{TEXTS.premiumMember}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="justify-start w-full h-10 text-sm font-normal transition-colors md:text-base hover:bg-primary/10 group"
                  onClick={() => {
                    router.push("/change-password");
                    setIsOpen(false);
                  }}
                >
                  <Lock className="mr-3 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
                  {TEXTS.changePassword}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full h-10 text-sm font-normal transition-colors md:text-base hover:bg-primary/10 group"
                  onClick={() => {
                    router.push("/password-recovery");
                    setIsOpen(false);
                  }}
                >
                  <KeyRound className="mr-3 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
                  {TEXTS.resetPassword}
                </Button>
                <Separator color="#D1D5DB" className="my-2" />
                <Button
                  variant="ghost"
                  className="justify-start w-full h-10 text-sm text-red-600 transition-colors md:text-base hover:text-red-700 hover:bg-red-50 group"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-3 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
                  {TEXTS.logout}
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    );
  }

  // Unauthenticated user card
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative p-0 w-10 h-10 2xl:w-12 2xl:h-12 rounded-full transition-all duration-200",
            className,
            isOpen ? "ring-2 ring-[#D4AF37]" : "",
          )}
          aria-label="User menu"
        >
          <Avatar className="w-10 h-10 ring-2 2xl:w-12 2xl:h-12 ring-primary/20">
            <AvatarFallback className="text-white bg-gradient-to-br from-gray-400 to-gray-600">
              <User className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-0 w-[270px] md:w-80 border-0 shadow-xl backdrop-blur-sm duration-200 bg-background/95 animate-in slide-in-from-top-2",
          lexend.className,
        )}
        align="end"
        sideOffset={8}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-3">
              <Avatar className="w-10 h-10 ring-2 md:w-12 md:h-12 ring-primary/20">
                <AvatarFallback className="text-white bg-gradient-to-br from-gray-400 to-gray-600">
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-lg font-semibold">{TEXTS.greeting}</h3>
            <p className="text-sm text-muted-foreground">{TEXTS.loginPrompt}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Button
                className="w-full h-10 text-sm font-normal bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 md:text-base hover:from-blue-500 hover:to-purple-500 active:from-blue-400 active:to-purple-400 group"
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
              >
                <LogIn className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
                {TEXTS.login}
              </Button>
              <Button
                className="w-full h-10 text-sm font-normal bg-gradient-to-r from-orange-600 to-amber-600 transition-all duration-200 md:text-base hover:from-orange-500 hover:to-amber-500 active:from-orange-400 active:to-amber-400 group"
                onClick={() => {
                  router.push("/register");
                  setIsOpen(false);
                }}
              >
                <UserPlus className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
                {TEXTS.register}
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
