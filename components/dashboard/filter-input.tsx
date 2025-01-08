"use client";

import { FC, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionData {
  id: number;
  label: string;
  value: string;
}

interface OptionProps {
  option?: OptionData[];
}

const FilterInput: FC<OptionProps> = ({ option }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [filterValue, setFilterValue] = useState<string>(
    searchParams.get("filter") || "",
  );
  const [statusValue, setStatusValue] = useState<string>(
    searchParams.get("status") || "",
  );

  // Create debounced values
  const [debouncedFilter] = useDebounce(filterValue, 500);
  const [debouncedStatus] = useDebounce(statusValue, 500);

  // Update URL when debounced values change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Handle filter param
    if (!debouncedFilter.trim()) {
      params.delete("filter");
    } else {
      params.set("filter", debouncedFilter);
    }

    // Handle status param
    if (!debouncedStatus.trim()) {
      params.delete("status");
    } else {
      params.set("status", debouncedStatus);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedFilter, debouncedStatus, pathname, router, searchParams]);

  return (
    <div className="flex space-x-3">
      <Input
        value={filterValue}
        placeholder="Cari berdasar no invoice, custname, dan alamat"
        type="text"
        className="w-60 bg-white"
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
      />

      {option?.length && (
        <Select
          value={statusValue}
          onValueChange={(value) => {
            setStatusValue(value);
          }}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            {option.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FilterInput;
