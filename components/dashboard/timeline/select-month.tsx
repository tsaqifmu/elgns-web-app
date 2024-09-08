"use client";
import { useEffect, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const months = [
  {
    value: "0",
    label: "Januari",
  },
  {
    value: "1",
    label: "Februari",
  },
  {
    value: "2",
    label: "Maret",
  },
  {
    value: "3",
    label: "April",
  },
  {
    value: "4",
    label: "Mei",
  },
  {
    value: "5",
    label: "Juni",
  },
  {
    value: "6",
    label: "Juli",
  },
  {
    value: "7",
    label: "Agustus",
  },
  {
    value: "8",
    label: "September",
  },
  {
    value: "9",
    label: "Oktober",
  },
  {
    value: "10",
    label: "November",
  },
  {
    value: "11",
    label: "Desember",
  },
];

const SelectMonth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const updateUrlParams = (monthValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("month", monthValue.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? months.find((month) => month.value === value)?.label
            : "Pilih bulan"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari bulan..." />
          <CommandList>
            <CommandEmpty>Data tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {months.map((month) => (
                <CommandItem
                  key={month.value}
                  value={month.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    updateUrlParams(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === month.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {month.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectMonth;
