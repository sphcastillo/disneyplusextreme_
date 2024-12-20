import React from "react";
import Link from "next/link";
import { Ramabhadra } from "next/font/google";
import { ChevronDown } from "lucide-react";
import { Genres } from "@/typings";

const ramabhadra = Ramabhadra({ weight: "400", subsets: ["latin"] });

async function GenreDropdown() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;

  return (
    <div className={`${ramabhadra.className} flex`}>
      <div className="relative group">
        {/* Dropdown Trigger */}
        <div className="pt-2 flex items-center cursor-pointer">
          <span className="text-white uppercase pl-5 sm:pl-0">Genres</span>
          <ChevronDown className="ml-1 hidden sm:block text-white" />
        </div>

        {/* Dropdown Content */}
        <div className="absolute left-0 z-[500] bg-gradient-to-b from-[#14143C] to-[#142878] text-white border-2 border-white mt-2 hidden group-hover:flex flex-col gap-2 py-4 rounded-xl shadow-lg min-w-[160px]">
          <div className="flex items-center justify-center">
            <span className="font-bold text-sm">Select a Genre</span>
          </div>
          <hr className="my-1 border-white" />
          {data.genres.map((genre, index) => (
            <div key={index} className="hover:underline">
              <Link
                href={`/genre/${genre.id}?genre=${genre.name}`}
                className="px-3"
              >
                {genre.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreDropdown;
