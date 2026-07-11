import { storage } from "@/store/mmkv/storage";

export const width = storage.getNumber("device-width") ?? 400;
export const height = storage.getNumber("device-height") ?? 400;
