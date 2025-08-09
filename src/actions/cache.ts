"use server";

import type { Route } from "next";
import { revalidatePath, revalidateTag } from "next/cache";

type RevalidatePathProps = {
  path: Route;
  type?: "page" | "layout";
}[];

/**
 * Revalidates multiple tags
 * @param {string[]} tags - The tags to revalidate
 */
export const revalidateTags = async (tags: string[]) => {
  // Note: no need to await; revalidateTag is sync, but keeping function async is fine.
  tags.forEach((tag) => revalidateTag(tag));
};

/**
 * Revalidates multiple paths.
 *
 * @param paths A list of objects where each object has:
 * - `path`: The path to revalidate.
 * - `type`: 'page' | 'layout'.
 *
 * @example
 * revalidatePaths([
 *   { path: '/dashboard/inbox', type: 'layout' },
 *   { path: '/dashboard/settings/tags', type: 'page' },
 * ]);
 */
export const revalidatePaths = async (paths: RevalidatePathProps) => {
  paths.forEach((item) => revalidatePath(item.path, item.type));
};
