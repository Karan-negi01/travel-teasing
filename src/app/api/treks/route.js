import { NextResponse } from "next/server";
import { treks, getTreksByDifficulty, getTreksByState, getTreksByCity, getTreksBySeason, getTrekById } from "@/data/treks";

// GET /api/treks
// Optional query params:
// - id: number (single trek)
// - difficulty: string (e.g. "Moderate")
// - stateId: slug (e.g. "uttarakhand")
// - cityId: slug (e.g. "chamoli")
// - season: string (e.g. "September")
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id) {
    const trek = getTrekById(id);
    if (!trek) {
      return NextResponse.json({ error: "Trek not found" }, { status: 404 });
    }
    return NextResponse.json({ data: trek });
  }

  let results = [...treks];

  const difficulty = searchParams.get("difficulty");
  const stateId = searchParams.get("stateId");
  const cityId = searchParams.get("cityId");
  const season = searchParams.get("season");

  if (difficulty) {
    results = getTreksByDifficulty(difficulty);
  }

  if (stateId) {
    results = results.filter((trek) => trek.stateId === stateId);
  }

  if (cityId) {
    results = results.filter((trek) => trek.cityId === cityId);
  }

  if (season) {
    const bySeason = getTreksBySeason(season);
    const ids = new Set(bySeason.map((t) => t.id));
    results = results.filter((t) => ids.has(t.id));
  }

  return NextResponse.json({ count: results.length, data: results });
}

