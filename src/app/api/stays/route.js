import { NextResponse } from "next/server";
import { stays, getStaysByCity, getStaysByState, getStaysNearDestination } from "@/data/stays";

// GET /api/stays
// Optional query params:
// - id: number (single stay)
// - cityId: slug
// - stateId: slug
// - nearCityId, nearStateId: use getStaysNearDestination helper
// - type: "Hotel", "Homestay", etc. (exact match)
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id) {
    const stay = stays.find((s) => s.id === Number(id));
    if (!stay) {
      return NextResponse.json({ error: "Stay not found" }, { status: 404 });
    }
    return NextResponse.json({ data: stay });
  }

  const nearCityId = searchParams.get("nearCityId");
  const nearStateId = searchParams.get("nearStateId");
  if (nearCityId || nearStateId) {
    const limit = Number(searchParams.get("limit")) || 6;
    const nearby = getStaysNearDestination(nearCityId || undefined, nearStateId || undefined, limit);
    return NextResponse.json({ count: nearby.length, data: nearby });
  }

  let results = [...stays];

  const cityId = searchParams.get("cityId");
  const stateId = searchParams.get("stateId");
  const type = searchParams.get("type");

  if (cityId) {
    results = getStaysByCity(cityId);
  } else if (stateId) {
    results = getStaysByState(stateId);
  }

  if (type) {
    results = results.filter((s) => s.type === type);
  }

  return NextResponse.json({ count: results.length, data: results });
}

