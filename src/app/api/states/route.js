import { NextResponse } from "next/server";
import { states, getCitiesByState, getStateById } from "@/data/locations";

// GET /api/states
// Optional query params:
// - id: slug (single state)
// - includeCities: "true" to include cities list for each state
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const includeCities = searchParams.get("includeCities") === "true";

  if (id) {
    const state = getStateById(id);
    if (!state) {
      return NextResponse.json({ error: "State not found" }, { status: 404 });
    }

    const payload = includeCities
      ? { ...state, cities: getCitiesByState(state.id) }
      : state;

    return NextResponse.json({ data: payload });
  }

  const data = states.map((state) => {
    if (!includeCities) return state;
    return {
      ...state,
      cities: getCitiesByState(state.id),
    };
  });

  return NextResponse.json({ count: data.length, data });
}

