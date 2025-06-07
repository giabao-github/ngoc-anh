"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface EmailPhoneSwitchProps {
  onMethodChange: (method: "email" | "phone") => void;
}

export default function EmailPhoneSwitch({
  onMethodChange,
}: EmailPhoneSwitchProps) {
  const [method, setMethod] = useState<"email" | "phone">("email");

  const toggleMethod = (clicked: "email" | "phone") => {
    const newMethod =
      method === clicked ? (clicked === "email" ? "phone" : "email") : clicked;
    setMethod(newMethod);
    onMethodChange(newMethod);
  };

  return (
    <div className={`flex items-center justify-center gap-8 mb-4`}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => toggleMethod("email")}
      >
        <Switch
          checked={method === "email"}
          className="bg-gray-300 data-[state=checked]:bg-blue-500 pointer-events-none"
        />
        <Label
          className={`cursor-pointer ${
            method === "email" ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          Email
        </Label>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => toggleMethod("phone")}
      >
        <Switch
          checked={method === "phone"}
          onCheckedChange={() => toggleMethod("phone")}
          className="bg-gray-300 data-[state=checked]:bg-blue-500 pointer-events-none"
        />
        <Label
          className={`cursor-pointer ${
            method === "phone" ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          Số điện thoại
        </Label>
      </div>
    </div>
  );
}
