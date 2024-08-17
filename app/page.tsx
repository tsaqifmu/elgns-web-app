import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section>
      <p>Silahkan ke halaman login</p>
      <Button>
        <Link href={"/login"}>Login</Link>
      </Button>
    </section>
  );
};

export default page;
