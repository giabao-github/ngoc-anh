import { useCallback, useState } from "react";

import { toast } from "sonner";

import { AddressData, District, Province, Ward } from "@/app/types";

export const useAddressData = () => {
  const [addressData, setAddressData] = useState<AddressData>({
    provinces: [] as Province[],
    districts: [] as District[],
    wards: [] as Ward[],
    loading: {
      provinces: false,
      districts: false,
      wards: false,
    },
  });

  const fetchProvinces = useCallback(async () => {
    try {
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, provinces: true },
      }));

      const response = await fetch("https://provinces.open-api.vn/api/p/");
      if (!response.ok) {
        throw new Error("Failed to fetch provinces");
      }

      const data = await response.json();
      setAddressData((prev) => ({
        ...prev,
        provinces: data,
        loading: { ...prev.loading, provinces: false },
      }));
    } catch (error) {
      console.error("Error fetching provinces:", error);
      toast.error("Không thể tải danh sách tỉnh/thành phố");
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, provinces: false },
      }));
    }
  }, []);

  const fetchDistricts = useCallback(async (provinceCode: string) => {
    if (!provinceCode) {
      return;
    }

    try {
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, districts: true },
      }));

      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }

      const data = await response.json();
      setAddressData((prev) => ({
        ...prev,
        districts: data.districts || [],
        wards: [], // Reset wards when province changes
        loading: { ...prev.loading, districts: false },
      }));
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Không thể tải danh sách quận/huyện");
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, districts: false },
      }));
    }
  }, []);

  const fetchWards = useCallback(async (districtCode: string) => {
    if (!districtCode) {
      return;
    }

    try {
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, wards: true },
      }));

      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wards");
      }

      const data = await response.json();
      setAddressData((prev) => ({
        ...prev,
        wards: data.wards || [],
        loading: { ...prev.loading, wards: false },
      }));
    } catch (error) {
      console.error("Error fetching wards:", error);
      toast.error("Không thể tải danh sách phường/xã");
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, wards: false },
      }));
    }
  }, []);

  return {
    addressData,
    setAddressData,
    fetchProvinces,
    fetchDistricts,
    fetchWards,
  };
};
