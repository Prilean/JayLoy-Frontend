"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordInput, TextInput } from "@/components/customeInput";


export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="header">JayLoy</h1>
          <p className="description-medium mt-2">Spend wisely, waste less, save more</p>
        </div>

        <form className="space-y-4">
          <TextInput type="text" placeholder="Username" />
          <TextInput type="email" placeholder="E-mail" />

          <PasswordInput placeholder="Password" />
          <PasswordInput placeholder="Confirm-Password" />

          {/* <div className="text-center">
            <Link href="#" className="hover:underline description-small">Skip</Link>
          </div> */}
          <div className="relative description-small">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-2 border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground"></span>
            </div>
          </div>

          <div className="text-center description-small">
            By creating your account, you're agreeing to our{" "}
            <Link href="#" className="underline hover:text-primary">Terms and Conditions</Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </div>

          <Button className="green-button !text-white">Sign In</Button>

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
            <Link href="/login" className="description-small hover:underline">
              I already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
