"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Arsenal } from "next/font/google";

const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

interface EmailPhoneSwitchProps {
  onMethodChange: (method: "email" | "phone") => void;
}

export default function EmailPhoneSwitch({ onMethodChange }: EmailPhoneSwitchProps) {
  const [method, setMethod] = useState<"email" | "phone">("email");

  const handleToggle = (newMethod: "email" | "phone") => {
    if (method !== newMethod) {
      setMethod(newMethod);
      onMethodChange(newMethod);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-8 mb-4 ${arsenal.className}`}>
      <div className="flex items-center gap-2">
        <Switch
          checked={method === "email"}
          onCheckedChange={() => handleToggle("email")}
          className="bg-gray-300 data-[state=checked]:bg-blue-500"
        />
        <Label className={method === "email" ? "text-blue-600 font-semibold" : "text-gray-600"}>Email</Label>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={method === "phone"}
          onCheckedChange={() => handleToggle("phone")}
          className="bg-gray-300 data-[state=checked]:bg-blue-500"
        />
        <Label className={method === "phone" ? "text-blue-600 font-semibold" : "text-gray-600"}>Số điện thoại</Label>
      </div>
    </div>
  );
}
