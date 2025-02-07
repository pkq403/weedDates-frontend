import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import weedLogo from "@/assets/weed.png";
import { image } from "@heroui/theme";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function IndexPage() {
  const navigate = useNavigate();
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const pass = formData.get("password");
      console.log(email);
      navigate("/calendar");
    },
    []
  );
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4 py-8 md:py-10">
      {/* <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      <div className="flex flex-col gap-4 p-5 w-3/12 h-8/12 rounded-lg bg-primary">
        <div className="w-full justify-items-center">
          <img className="w-25 mix-blend-multiply" src={weedLogo}></img>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input color="primary" label="Email" type="email" name="email" />
            <Input color="primary" label="Password" type="password" name="password" />
          </div>
          <Button
            className="w-4 ml-auto"
            type="submit"
            color="secondary"
            size="md"
            variant="shadow"
          >
            {" "}
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
