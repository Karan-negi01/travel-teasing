"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "travelteasing_shortlist_v1";

function readStorage() {
  if (typeof window === "undefined") return { treks: [], offbeat: [], stays: [], temples: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { treks: [], offbeat: [], stays: [], temples: [] };
    const parsed = JSON.parse(raw);
    return {
      treks: Array.isArray(parsed.treks) ? parsed.treks : [],
      offbeat: Array.isArray(parsed.offbeat) ? parsed.offbeat : [],
      stays: Array.isArray(parsed.stays) ? parsed.stays : [],
      temples: Array.isArray(parsed.temples) ? parsed.temples : [],
    };
  } catch {
    return { treks: [], offbeat: [], stays: [], temples: [] };
  }
}

function writeStorage(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useShortlist() {
  const [items, setItems] = useState({ treks: [], offbeat: [], stays: [], temples: [] });

  useEffect(() => {
    setItems(readStorage());
  }, []);

  const isSaved = (type, id) => {
    const list = items[type] || [];
    return list.includes(id);
  };

  const toggleItem = (type, id) => {
    setItems((prev) => {
      const current = prev[type] || [];
      const exists = current.includes(id);
      const nextTypeList = exists ? current.filter((x) => x !== id) : [...current, id];
      const next = { ...prev, [type]: nextTypeList };
      writeStorage(next);
      return next;
    });
  };

  return {
    items,
    isSaved,
    toggleItem,
  };
}

