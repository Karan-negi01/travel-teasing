import { NextResponse } from "next/server";
import {
  offbeatPlaces,
  getOffbeatPlacesByState,
  getOffbeatPlacesByCity,
  getOffbeatPlacesByType,
  getOffbeatPlaceById,
} from "@/data/offbeat";

// GET /api/offbeat
// Optional query params:
// - id: number (single place)
// - stateId: slug
// - cityId: slug
// - type: string (partial match on type)
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id) {
    const place = getOffbeatPlaceById(id);
    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }
    return NextResponse.json({ data: place });
  }

  let results = [...offbeatPlaces];

  const stateId = searchParams.get("stateId");
  const cityId = searchParams.get("cityId");
  const type = searchParams.get("type");

  if (stateId) {
    results = getOffbeatPlacesByState(stateId);
  }

  if (cityId) {
    results = results.filter((place) => place.cityId === cityId);
  }

  if (type) {
    const byType = getOffbeatPlacesByType(type);
    const ids = new Set(byType.map((p) => p.id));
    results = results.filter((p) => ids.has(p.id));
  }

  return NextResponse.json({ count: results.length, data: results });
}

