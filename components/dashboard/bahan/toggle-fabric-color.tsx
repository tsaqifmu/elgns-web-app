import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ToggleFabricColor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [fabricColor, setFabricColor] = useState<string>("other");

  const updateUrlParams = (fabricColor: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("fabricColor", fabricColor.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeColorStyle = () => "border-teal bg-teal/20 text-teal";

  updateUrlParams(fabricColor);

  return (
    <div className="w-full space-x-2">
      <Button
        variant={"outline"}
        className={cn(
          "text-xs font-bold uppercase hover:border-teal hover:bg-teal/20 hover:text-teal lg:text-lg",
          fabricColor === "putih" && activeColorStyle(),
        )}
        onClick={() => setFabricColor("putih")}
      >
        <p>KAIN PUTIH</p>
      </Button>
      <Button
        variant={"outline"}
        className={cn(
          "text-xs font-bold uppercase hover:border-teal hover:bg-teal/20 hover:text-teal lg:text-lg",
          fabricColor === "other" && activeColorStyle(),
        )}
        onClick={() => setFabricColor("other")}
      >
        <p>KAIN WARNA</p>
      </Button>
    </div>
  );
};

export default ToggleFabricColor;
