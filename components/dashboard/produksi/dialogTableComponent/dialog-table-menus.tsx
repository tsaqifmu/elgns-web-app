import { cn } from "@/lib/utils";

interface DialogTableMenusProductionProps {
  menus: string[];
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export const DialogTableMenusProduction = ({
  menus,
  activeMenu,
  setActiveMenu,
}: DialogTableMenusProductionProps) => {
  return (
    <>
      {menus.map((menu) => (
        <button
          key={menu}
          onClick={() => {
            setActiveMenu(menu);
          }}
          className={cn(
            "h-full border-gray-900 py-3 text-gray-400 transition-all hover:border-b-2 hover:text-gray-900",
            activeMenu === menu ? "border-b-2 text-gray-900" : "",
          )}
        >
          {menu}
        </button>
      ))}
    </>
  );
};
