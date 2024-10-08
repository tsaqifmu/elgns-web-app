import { Icons } from "@/public/icons";

const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="py-2">
          <Icons.Logo />
        </div>
        <div className="flex h-full w-full items-center justify-center font-sans">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
