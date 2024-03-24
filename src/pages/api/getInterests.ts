import { faker } from "@faker-js/faker";
import { type NextApiRequest, type NextApiResponse } from "next";

const generateCategories = (count: number): string[] => {
  const categories: string[] = [];
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line
    categories.push(faker.commerce.department());
  }
  return categories;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page) || 1;
  const pageSize = 10;
  const totalCount = 100;

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const categories = generateCategories(totalCount).slice(startIndex, endIndex);

  res.status(200).json({
    categories,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    },
  });
}
