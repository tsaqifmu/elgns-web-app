import { FC, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const [filterValue, setFilterValue] = useState<string>(
    searchParams.get("filter") || "",
  );
  const [statusValue, setStatusValue] = useState<string>(
    searchParams.get("status") || "",
  );

  const updateUrlParams = (newFilter: string, paramsName: string) => {
    const params = new URLSearchParams(searchParams);

    // Jika filter kosong, hapus parameter
    if (!newFilter.trim()) {
      params.delete(paramsName);
    } else {
      params.set(paramsName, newFilter.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex space-x-3">
      <Input
        value={filterValue}
        placeholder="Cari berdasar no invoice, custname, dan alamat"
        type="text"
        className="w-60 bg-white"
        onChange={(event) => {
          const value = event.target.value;

          setFilterValue(value);
          updateUrlParams(value, "filter");
        }}
      />

      {option?.length && (
        <Select
          value={statusValue}
          onValueChange={(value) => {
            setStatusValue(value);
            updateUrlParams(value, "status");
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
