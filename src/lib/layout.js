/**
 * Travel site layout: wider content, less side margin, full-bleed friendly.
 * Use CONTAINER for section content; use CONTAINER_PX for full-bleed rows so they align.
 */
export const CONTAINER =
  "max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10";

/** Same horizontal padding only - for full-width rows (e.g. card carousels) so first card aligns with section title */
export const CONTAINER_PX = "px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10";
