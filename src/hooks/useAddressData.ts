import { useCallback, useState } from "react";

import { toast } from "sonner";

import { AddressData, District, Province, Ward } from "@/app/types";

const FETCH_TIMEOUT = 10000;
const cache = new Map<string, any>();

const fetchWithTimeout = async (url: string) => {
  const cached = cache.get(url);
  if (cached) {
    return cached;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
    throw new Error("An unknown error occurred");
  } finally {
    clearTimeout(timeoutId);
  }
};

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

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_ADDRESS_API_URL ||
    "https://provinces.open-api.vn/api";

  const fetchProvinces = useCallback(async () => {
    try {
      setAddressData((prev) => ({
        ...prev,
        loading: { ...prev.loading, provinces: true },
      }));

      const data = await fetchWithTimeout(`${API_BASE_URL}/p/`);
      setAddressData((prev) => ({
        ...prev,
        provinces: data,
        loading: { ...prev.loading, provinces: false },
      }));
    } catch (error) {
      console.error("Error fetching provinces:", error);
      toast.error("Không thể tải danh sách tỉnh/thành phố", {
        id: "fetch-provinces-error",
      });
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

      const data = await fetchWithTimeout(
        `${API_BASE_URL}/p/${provinceCode}?depth=2`,
      );
      setAddressData((prev) => ({
        ...prev,
        districts: data.districts || [],
        wards: [],
        loading: { ...prev.loading, districts: false },
      }));
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Không thể tải danh sách quận/huyện", {
        id: "fetch-districts-error",
      });
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

      const data = await fetchWithTimeout(
        `${API_BASE_URL}/d/${districtCode}?depth=2`,
      );
      setAddressData((prev) => ({
        ...prev,
        wards: data.wards || [],
        loading: { ...prev.loading, wards: false },
      }));
    } catch (error) {
      console.error("Error fetching wards:", error);
      toast.error("Không thể tải danh sách phường/xã", {
        id: "fetch-wards-error",
      });
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
