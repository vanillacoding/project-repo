import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const letterDirectory = join(process.cwd(), "/public/_letter");

export function getLetterSlugs() {
  return fs.readdirSync(letterDirectory);
}

export function getLetterBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(letterDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllLetterList(fields = []) {
  const slugs = getLetterSlugs();

  const quizList = slugs
    .map((slug) => getLetterBySlug(slug, fields))
    .sort((a, b) => b.slug - a.slug);
  return quizList;
}
