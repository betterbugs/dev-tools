"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "./components/ui/Pagination";
import BBIcon from "./components/theme/Icon/bbIcon";
import DevelopmentToolsStyles from "./developmentToolsStyles.module.scss";
import { InputField } from "./components/theme/form/formFeildComponent";
import { useForm } from "react-hook-form";
import CrossIcon from "./components/theme/Icon/crossIcon";
import SearchIcon from "./components/theme/Icon/searchIcon";
import SEOComponent from "./components/theme/SEOComponent/SEOComponent";
import { developmentToolsCategoryContent, SEO_META } from "./libs/constants";
import Link from "next/link";
import NoDataIcon from "./components/theme/Icon/noDataIcon";
import TextLabIcon from "./components/theme/Icon/textLabIcon";
import CodeForgeIcon from "./components/theme/Icon/codeForgeIcon";
import ConvertXIcon from "./components/theme/Icon/convertXIcon";
import GenieIcon from "./components/theme/Icon/genieIcon";
import DevUtilsIcon from "./components/theme/Icon/devUtilsIcon";

const escapeRegex = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HighlightText = ({
  text,
  searchTerm,
  className,
}: {
  text: string;
  searchTerm: string;
  className?: string;
}) => {
  if (!searchTerm?.trim()) return <span className={className}>{text}</span>;
  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, "gi");
  const parts = text.split(regex);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark
            key={i}
            className={DevelopmentToolsStyles.searchHighlight}
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </span>
  );
};

const CATEGORY_GROUPS = [
  "Text Lab",
  "Code Forge",
  "ConvertX",
  "Genie Hub",
  "Dev Utils",
] as const;

type CategoryGroup = typeof CATEGORY_GROUPS[number];

// Basis (type) filters
const BASIS = [
  "All",
  "Formatters/Beautifiers",
  "Converters",
  "Encoding/Decoding",
  "Generators",
  "Color/Image",
  "Minifiers/Compressors",
  "Validators/Checkers",
  "Date/Time",
] as const;

type BasisType = typeof BASIS[number];

const classify = (title: string, url: string): CategoryGroup => {
  const t = `${title} ${url}`.toLowerCase();
  if (
    t.includes("generator") ||
    t.includes("random") ||
    t.includes("lorem") ||
    t.includes("placeholder")
  )
    return "Genie Hub";

  if (
    t.includes("convert") ||
    t.includes("converter") ||
    t.includes("to ") ||
    t.includes("px-to") ||
    t.includes("rem-to") ||
    t.includes("-to-")
  )
    return "ConvertX";

  if (
    t.includes("minify") ||
    t.includes("prettify") ||
    t.includes("formatter") ||
    t.includes("beautifier") ||
    t.includes("obfuscator") ||
    t.includes("html") ||
    t.includes("css") ||
    t.includes("xml") ||
    t.includes("json") ||
    t.includes("sql") ||
    t.includes("js")
  )
    return "Code Forge";

  if (
    t.includes("text") ||
    t.includes("word") ||
    t.includes("sentence") ||
    t.includes("character") ||
    t.includes("case")
  )
    return "Text Lab";

  return "Dev Utils";
};

const classifyBasis = (title: string, url: string): BasisType => {
  const t = `${title} ${url}`.toLowerCase();
  if (
    t.includes("convert") ||
    t.includes("converter") ||
    t.includes("-to-") ||
    /\w+\s+to\s+\w+/.test(t)
  )
    return "Converters";

  if (t.includes("generator") || t.includes("random")) return "Generators";

  if (t.includes("color") || t.includes("image")) return "Color/Image";

  if (
    t.includes("format") ||
    t.includes("prettify") ||
    t.includes("beautifier")
  )
    return "Formatters/Beautifiers";

  if (t.includes("minify") || t.includes("compress")) return "Minifiers/Compressors";

  if (t.includes("validator") || t.includes("validate") || t.includes("check"))
    return "Validators/Checkers";

  if (t.includes("base64") || t.includes("encode") || t.includes("decode"))
    return "Encoding/Decoding";

  if (t.includes("date") || t.includes("time")) return "Date/Time";


  return "All";
};

const PAGE_SIZE = 30;
const SEARCH_PAGINATION_THRESHOLD = 9;

const Page = () => {
  const { register, formState, setValue } = useForm<any>({});
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryGroup | null>(null);
  const [selectedBasis, setSelectedBasis] = useState<BasisType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById("txtSearch") as HTMLInputElement;
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      // Escape to blur/clear search
      if (e.key === "Escape" && document.activeElement?.id === "txtSearch") {
        e.preventDefault();
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBasis]);

  const handleClearSearch = () => {
    setValue("txtSearch", "");
    setSearchTerm("");
    setIsSearch(false);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setIsSearch(event.target.value.length > 0);
  };

  const allItems = Object.entries(developmentToolsCategoryContent || {}).flatMap(
    ([, arr]) => ((arr as any[]) || []).map((item: any) => ({ ...item }))
  );

  const itemsWithMeta = allItems.map((item: any) => ({
    ...item,
    __group: classify(item?.title || "", item?.url || ""),
    __basis: classifyBasis(item?.title || "", item?.url || ""),
  }));

  const filteredItems = itemsWithMeta
    .filter((item) => {
      if (!searchTerm) return true;
      const t = searchTerm.toLowerCase();
      return (
        (item?.title || "").toLowerCase().includes(t) ||
        (item?.description || "").toLowerCase().includes(t) ||
        (item?.url || "").toLowerCase().includes(t)
      );
    })
    .filter((item) => (selectedCategory ? item.__group === selectedCategory : true))
    .filter((item) => (selectedBasis === "All" ? true : item.__basis === selectedBasis));

  // Determine whether pagination should show
  const showPagination = isSearch
    ? filteredItems.length > SEARCH_PAGINATION_THRESHOLD
    : filteredItems.length > PAGE_SIZE;

  // Slice for current page
  const paginatedItems = showPagination
    ? filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : filteredItems;

  // Info label
  const startItem = showPagination ? (currentPage - 1) * PAGE_SIZE + 1 : 1;
  const endItem = showPagination
    ? Math.min(currentPage * PAGE_SIZE, filteredItems.length)
    : filteredItems.length;

  const countsByGroup: Record<CategoryGroup, number> = CATEGORY_GROUPS.reduce(
    (acc, g) => ({ ...acc, [g]: itemsWithMeta.filter((i) => i.__group === g).length }),
    {} as Record<CategoryGroup, number>
  );

  const countsByBasis: Record<BasisType, number> = (BASIS as readonly BasisType[]).reduce(
    (acc, b) => ({
      ...acc,
      [b]: b === "All" ? itemsWithMeta.length : itemsWithMeta.filter((i) => i.__basis === b).length,
    }),
    {} as Record<BasisType, number>
  );

  return (
    <>
      <SEOComponent
        title={SEO_META?.developmentTools?.title}
        description={SEO_META?.developmentTools?.description}
        ogTitle={SEO_META?.developmentTools?.title}
        ogDescription={SEO_META?.developmentTools?.description}
        ogImage={SEO_META?.developmentTools?.ogImage}
      />
      <div className="max-w-[770px] mx-auto">
        <div className="px-3 md:px-auto mx-auto">
          <div className="flex flex-col justify-center items-center md:pb-[10px] md:pt-[70px] py-[50px]">
            <BBIcon />
            <h1 className="md:text-[54px] text-[32px] font-black text-white text-center pb-4 md:leading-[70px] leading-[50px] lg:min-w-[930px] md:pt-5">
              Developer Utility Tools
            </h1>
            <p className="text-lg font-normal text-white/70 md:mt-2 mt-[26px] md:w-[90%] text-center">
              A comprehensive suite of handy tools designed for developers.
              Format JSON, convert text cases, encode/decode, generate UUIDs,
              and perform countless other everyday tasks
            </p>
          </div>
        </div>
        <div className={DevelopmentToolsStyles.searchInput}>
          <InputField
            {...{
              register,
              formState,
              id: "txtSearch",
              placeholder: "Search Tool...",
              autoComplete: "off",
              onChange: handleSearchChange,
            }}
          />
          {isSearch ? (
            <div
              className={`absolute lg:right-[210px] lg:top-4 right-11 top-4 2xl:right-[13rem] 2xl:top-4`}
            >
              <CrossIcon
                className="w-[14px] cursor-pointer"
                onClick={handleClearSearch}
              />
            </div>
          ) : (
            <div className="absolute lg:right-[210px] lg:top-4 right-11 top-4 2xl:right-[13rem] 2xl:top-4 flex items-center gap-2">
              <span className={DevelopmentToolsStyles.keyboardHint}>Ctrl K</span>
              <SearchIcon className="text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1170px] mx-auto md:my-[70px] my-[50px] px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-[260px] shrink-0 bg-white/5 rounded-xl p-4 h-fit md:sticky md:top-4 order-1 md:order-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white/90">Filters</h2>
              {(selectedCategory || selectedBasis !== "All") && (
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBasis("All");
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="mb-4">
              <p className="text-xs text-white/60 mb-2">Categories</p>
              <div className="space-y-2 md:mt-2">
                {CATEGORY_GROUPS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory((prev) => (prev === cat ? null : cat))}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition ${selectedCategory === cat
                      ? "bg-primary text-black font-bold border-primary"
                      : "bg-black/40 text-white border-[#222] hover:bg-black/50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        {cat === "Text Lab" && <TextLabIcon className="h-5 w-5" />}
                        {cat === "Code Forge" && <CodeForgeIcon className="h-5 w-5" />}
                        {cat === "ConvertX" && <ConvertXIcon className="h-5 w-5" />}
                        {cat === "Genie Hub" && <GenieIcon className="h-5 w-5" />}
                        {cat === "Dev Utils" && <DevUtilsIcon className="h-5 w-6" />}
                        {cat}
                      </span>
                      <span className={`text-xs ${selectedCategory === cat ? "text-black/80" : "text-white/60"}`}>
                        {countsByGroup[cat as CategoryGroup] || 0}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Basis filter */}
            <div className="my-8">
              <p className="text-xs text-white/60 mb-2 md:mt-4">Filter by Type</p>
              <div className="flex flex-wrap gap-2 md:mt-2">
                {BASIS?.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBasis(b)}
                    className={`px-2.5 py-1.5 rounded-full text-xs border transition ${selectedBasis === b
                      ? "bg-primary text-black font-bold border-primary"
                      : "bg-black/40 text-white border-[#222] hover:bg-black/50"
                      }`}
                    aria-pressed={selectedBasis === b ? "true" : "false"}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{b}</span>
                      {/* <span className={`${selectedBasis === b ? "text-black/80" : "text-white/60"}`}>{countsByBasis[b]}</span> */}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <main className="flex-1 order-2 md:order-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/60">
                {showPagination
                  ? `Showing ${startItem}–${endItem} of ${filteredItems.length} tools`
                  : `Showing ${filteredItems.length} tools`}
              </span>
              <div className="flex items-center gap-2">
                {selectedCategory && (
                  <button
                    className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 hover:bg-white/20"
                    onClick={() => setSelectedCategory(null)}
                    title="Clear category filter"
                  >
                    {selectedCategory} ✕
                  </button>
                )}
                {selectedBasis !== "All" && (
                  <button
                    className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 hover:bg-white/20"
                    onClick={() => setSelectedBasis("All")}
                    title="Clear type filter"
                  >
                    {selectedBasis} ✕
                  </button>
                )}
              </div>
            </div>
            {filteredItems.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-full text-center text-white/70 text-lg py-10">
                <NoDataIcon />
                <span className="mt-2">No tools found</span>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {paginatedItems.map((item: any, index: number) => (
                      <Link
                        key={`${item?.url}-${index}`}
                        href={`${item?.url}`}
                        className={`bg-white/5 rounded-lg p-8 w-full ${DevelopmentToolsStyles.contentCardHoverEffect} group md:min-h-[160px]`}
                      >
                        <div className="flex justify-start items-start gap-2">
                          <h3 className="text-lg font-semibold">
                            <HighlightText text={item?.title || ""} searchTerm={searchTerm} />
                          </h3>
                        </div>
                        <p className="text-white/70 group-hover:text-black/90 text-sm font-medium mt-1">
                          {(() => {
                            let description = item?.description || "";
                            let truncated =
                              description.length > 50
                                ? description.slice(0, 50) + "..."
                                : description;

                            return (
                              <HighlightText text={truncated} searchTerm={searchTerm} />
                            );
                          })()}
                        </p>
                        <div className="mt-3 text-xs text-white/50">{item?.__group} • {item?.__basis}</div>
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {showPagination && (
                  <Pagination
                    page={currentPage}
                    pageSize={PAGE_SIZE}
                    total={filteredItems.length}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
