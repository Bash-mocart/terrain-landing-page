"use client";

import { useEffect, useRef, useState } from "react";
import type { ExploreFilters, ExploreType } from "@/lib/explore";
import type { ListingTaxonomy } from "@/lib/types";

type Props = {
  filters: ExploreFilters;
  taxonomy: ListingTaxonomy;
  disabled: boolean;
  onFiltersChange: (filters: ExploreFilters) => void;
  onClear: () => void;
  onClose: () => void;
};

export const EXPLORE_TYPE_LABELS: Record<ExploreType, string> = {
  land: "Land",
  house: "House",
};

const PRICE_DEBOUNCE_MS = 400;
const priceFormatter = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  notation: "compact",
  style: "currency",
});

export function formatExplorePrice(value: number) {
  return priceFormatter.format(value);
}

function priceValue(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function ExploreFilterSheet({
  filters,
  taxonomy,
  disabled,
  onFiltersChange,
  onClose,
  onClear,
}: Props) {
  const [minimum, setMinimum] = useState(String(filters.minPrice ?? ""));
  const [maximum, setMaximum] = useState(String(filters.maxPrice ?? ""));
  const filtersRef = useRef(filters);
  const initialPriceRender = useRef(true);
  const activeType = taxonomy.types.find(
    (type) => type.slug === filters.typeSlug,
  );
  const minimumValue = priceValue(minimum);
  const maximumValue = priceValue(maximum);
  const invalidPrice =
    (minimum.trim() !== "" && minimumValue === undefined) ||
    (maximum.trim() !== "" && maximumValue === undefined);
  const invalidRange =
    minimumValue !== undefined &&
    maximumValue !== undefined &&
    minimumValue > maximumValue;

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    if (initialPriceRender.current) {
      initialPriceRender.current = false;
      return;
    }
    if (invalidPrice || invalidRange) return;
    const timer = window.setTimeout(() => {
      onFiltersChange({
        ...filtersRef.current,
        minPrice: minimumValue,
        maxPrice: maximumValue,
      });
    }, PRICE_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [invalidPrice, invalidRange, maximumValue, minimumValue, onFiltersChange]);

  function selectType(typeSlug: ExploreType) {
    const nextType = filters.typeSlug === typeSlug ? undefined : typeSlug;
    onFiltersChange({
      ...filters,
      typeSlug: nextType,
      subtypeSlug: undefined,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-primary/30 sm:items-center sm:justify-center"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="explore-filter-title"
        className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-canvas p-6 shadow-2xl sm:max-w-md sm:rounded-3xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2
            id="explore-filter-title"
            className="font-display text-2xl font-bold text-primary"
          >
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-2xl text-secondary"
          >
            ×
          </button>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-primary">
            Property type
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(Object.keys(EXPLORE_TYPE_LABELS) as ExploreType[]).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  disabled={disabled}
                  aria-pressed={filters.typeSlug === value}
                  onClick={() => selectType(value)}
                  className={`rounded-2xl border px-4 py-4 text-left font-semibold ${
                    filters.typeSlug === value
                      ? "border-primary bg-primary text-canvas"
                      : "border-border-rule text-primary"
                  }`}
                >
                  {EXPLORE_TYPE_LABELS[value]}
                </button>
              ),
            )}
          </div>
        </fieldset>

        {activeType && activeType.subtypes.length > 0 && (
          <label className="mt-5 block text-sm font-semibold text-primary">
            Property subtype
            <select
              value={filters.subtypeSlug ?? ""}
              disabled={disabled}
              onChange={(event) =>
                onFiltersChange({
                  ...filters,
                  subtypeSlug: event.target.value || undefined,
                })
              }
              className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal"
            >
              <option value="">All {activeType.name.toLowerCase()}</option>
              {activeType.subtypes.map((subtype) => (
                <option key={subtype.slug} value={subtype.slug}>
                  {subtype.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-primary">Price</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="text-xs text-secondary">
              Minimum
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={minimum}
                onChange={(event) => setMinimum(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base text-primary"
                placeholder="₦0"
              />
            </label>
            <label className="text-xs text-secondary">
              Maximum
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={maximum}
                onChange={(event) => setMaximum(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base text-primary"
                placeholder="Any"
              />
            </label>
          </div>
          {(invalidPrice || invalidRange) && (
            <p className="mt-2 text-xs text-secondary">
              {invalidRange
                ? "Maximum price must be greater than minimum price."
                : "Enter a valid price of zero or more."}
            </p>
          )}
        </fieldset>

        <label className="mt-5 flex items-center justify-between rounded-2xl border border-border-rule px-4 py-4 text-sm font-semibold text-primary">
          Verified listings only
          <input
            type="checkbox"
            checked={filters.verified ?? false}
            disabled={disabled}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                verified: event.target.checked || undefined,
              })
            }
            className="size-5 accent-[var(--color-verified)]"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            onClear();
            onClose();
          }}
          className="mt-5 w-full rounded-full border border-border-rule px-4 py-3 text-sm font-semibold text-primary"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
