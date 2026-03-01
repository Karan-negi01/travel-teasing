import { NextResponse } from "next/server";
import { getAllCities, getCityById, getStateById } from "@/data/locations";

// GET /api/cities
// Optional query params:
// - id: city slug (single city)
// - stateId: filter by state
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id) {
    const city = getCityById(id);
    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }
    const state = getStateById(city.stateId);
    return NextResponse.json({ data: { ...city, state } });
  }

  const stateId = searchParams.get("stateId");
  let cities = getAllCities();

  if (stateId) {
    const state = getStateById(stateId);
    if (!state) {
      return NextResponse.json({ error: "State not found" }, { status: 404 });
    }
    cities = cities.filter((city) => city.stateId === state.id);
  }

  return NextResponse.json({ count: cities.length, data: cities });
}

