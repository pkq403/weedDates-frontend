import weedLogo from "@/assets/weed.png";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { AuthorizationService } from "@/domain/services/auth/authorization.service";
import React from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString() || '';
      const pass = formData.get("password")?.toString() || ''
      try {
        await AuthorizationService.login({username: email,  password: pass}); 
        navigate("/calendar");
      } catch (err) {
        const res = err as Response;
        res.text().then((text) => {
          alert(text)
        })
      }
    },
    []
  );
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-4 p-5 w-[70vw] h-[60vh] xl:w-[30vw] xl:h-[60vh] md:w-[50vw] md:h-[60vw] sm:w-[30vw] sm:h-[60vw] rounded-lg bg-primary">
        <div className="w-full justify-items-center">
          <img className="w-25 mix-blend-multiply" src={weedLogo}></img>
        </div>
        <form className="flex flex-col gap-3 content-self-end" onSubmit={handleSubmit}>
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
