import React, { useEffect, useState } from "react";
import styles from "~/components/forms/forms.module.css";
import { classNames } from "~/utils/class-name.util";
import Checkbox from "../Inputs/Checkbox";

interface ApiResponse {
  categories: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

const InterestsForm: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/getInterests?page=${currentPage}`);
        if (response.ok) {
          const data: ApiResponse = (await response.json()) as ApiResponse;
          setCategories(data.categories);
          setTotalPages(data.pagination.totalPages);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    void fetchCategories();
  }, [currentPage]);

  return (
    <div
      className={classNames(
        styles.formContainer,
        "mt-10 flex flex-col rounded-3xl border border-solid border-stone-300 bg-white px-14 pt-10 text-base",
      )}
    >
      <div
        className="self-center font-semibold text-black"
        style={{ fontSize: "2rem" }}
      >
        Please mark your interests!
      </div>
      <div className="mb-9 mt-6 text-center text-base">
        We will keep you notified.
      </div>
      <div className="mb-7 text-xl" style={{ fontWeight: 500 }}>
        My saved interests!
      </div>

      <div className="mb-17 flex flex-col gap-6">
        {categories.slice(0, 6).map((category, index) => (
          <Checkbox
            key={`${category}${index}`}
            label={category}
            value={category}
          />
        ))}
      </div>

      <div className="mb-18 flex gap-2">
        {"<< < "}

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className="text-xl"
            key={i}
            role="button"
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1 === currentPage ? <b>{i + 1}</b> : i + 1}
          </button>
        ))}
        {"  >  >>"}
      </div>
    </div>
  );
};

export default InterestsForm;
