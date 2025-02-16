"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordInput, TextInput } from "@/components/customeInput";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="header">JayLoy</h1>
          <p className="description-medium mt-2">Spend wisely, waste less, save more</p>
        </div>

        <form className="space-y-4">
          <TextInput type="text" placeholder="Username" />
          <PasswordInput placeholder="Password" />

          <div className="text-center">
            <Link href="#" className="hover:underline description-small flex justify-end">Forget password</Link>
          </div>

          <Button className="green-button !text-white">Log In</Button>

          <div className="relative description-small">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-full">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="text-center ">
            <Link href="/signup" className="description-small hover:underline">
              Don't have an account?{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
