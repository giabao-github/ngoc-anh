import { useCallback, useState } from "react";

import { toast } from "sonner";

import { ToastIds } from "@/constants/toastIds";

import { AddressData, District, Province, Ward } from "@/types/invoice";

const FETCH_TIMEOUT = 10000;
const CACHE_TTL = 1000 * 60 * 60;
const cache = new Map<string, { ts: number; data: unknown }>();

const fetchWithTimeout = async (url: string) => {
  const now = Date.now();
  const cached = cache.get(url);

  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, { ts: now, data });
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
        id: ToastIds.FETCH_PROVINCES_ERROR,
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
        id: ToastIds.FETCH_DISTRICTS_ERROR,
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
        id: ToastIds.FETCH_WARDS_ERROR,
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
