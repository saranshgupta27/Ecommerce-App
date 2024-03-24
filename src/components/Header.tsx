import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useAuth } from "~/utils/AuthContext";
interface HeaderContentProps {
  categories: string[];
  userName: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  categories,
  userName = null,
}) => {
  const { logout: onLogout } = useAuth();

  return (
    <header className="flex w-full flex-col bg-white pt-0.5 max-md:max-w-full">
      {userName && (
        <div className="flex w-full flex-col items-end justify-center bg-white px-3 py-3 text-xs text-zinc-800  max-md:px-5">
          <div className="flex gap-5 pl-3.5">
            <div className="justify-center whitespace-nowrap py-0.5">Help</div>
            <div className="justify-center py-0.5">Orders & Returns</div>
            <div className="justify-center p-0.5 text-right">
              Hi, {userName}
            </div>
            <button
              onClick={() => onLogout()}
              className="justify-center p-0.5 text-right"
            >
              <b>Logout</b>
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full items-start justify-between gap-5 self-center px-10 max-md:max-w-full max-md:flex-wrap">
        <Link href="/">
          <h1
            className="flex font-bold text-black"
            style={{ fontSize: "2rem" }}
          >
            ECOMMERCE
          </h1>
        </Link>
        <nav
          style={{ marginBottom: "1.375rem" }}
          className="my-auto  mt-4 flex gap-5 self-stretch text-base font-semibold text-black max-md:flex-wrap"
        >
          {categories.map((category, index) => (
            <a href="#" key={index}>
              {category}
            </a>
          ))}
        </nav>
        <div className="mb-4 mt-2 flex justify-between gap-8">
          <Image
            src="/assets/search.svg"
            alt=""
            width={8}
            height={8}
            loading="lazy"
            className="aspect-square w-8 shrink-0"
          />
          <Image
            src="/assets/cart.svg"
            alt=""
            width={8}
            height={8}
            loading="lazy"
            className="aspect-square w-8 shrink-0"
          />
        </div>
      </div>
    </header>
  );
};

const Notification: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center bg-zinc-100 px-16 py-2 text-sm font-medium text-black max-md:max-w-full max-md:px-5">
      <div className="flex items-start gap-5">
        <Image
          src="/assets/arrowLeft.svg"
          setCurrentPage
          alt=""
          width={4}
          height={4}
          className="aspect-square w-4 shrink-0"
          loading="lazy"
        />
        <p className="flex-auto self-stretch">
          Get 10% off on business{" "}
          <Link href={"/signup"} className="underline">
            sign up
          </Link>
        </p>
        <Image
          src="/assets/arrowRight.svg"
          setCurrentPage
          alt=""
          width={4}
          height={4}
          className="aspect-square w-4 shrink-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default function Header() {
  const categories = [
    "Categories",
    "Sale",
    "Clearance",
    "New stock",
    "Trending",
  ];

  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <HeaderContent categories={categories} userName={user?.name} />
      {!user && <Notification />}
    </div>
  );
}
