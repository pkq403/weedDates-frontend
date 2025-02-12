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
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4 py-8 md:py-10">
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
