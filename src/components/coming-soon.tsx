"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatedSubscribeButton } from "./ui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const ComingSoon = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubscribeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setIsSubscribed(true);
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <section className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8">
      <Badge
        variant="outline"
        className="animate-fade-down [--animation-delay:200ms] text-md rounded-full"
      >
        Coming Soon
      </Badge>
      <h1 className="bg-gradient-to-b from-black dark:from-white to-black/50 dark:to-white/50 bg-clip-text py-6 font-semibold text-transparent text-6xl md:text-7xl lg:text-8xl animate-fade-down [--animation-delay:200ms]">
        ElevateGrad is redefining
        <br />
        how students connect
      </h1>
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-xl font-medium animate-fade-down [--animation-delay:200ms]">
          Your network starts here. Join us as we redefine student connections.
        </p>
        <form action="" className="flex items-center gap-4 py-1">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="animate-fade-down [--animation-delay:200ms] w-full max-w-md rounded-md border px-4 py-2 text-lg placeholder-gray-500 focus:ring-1 focus:ring-zinc-600 focus:outline-none"
          />
          <AnimatedSubscribeButton
            buttonColor="#000000"
            buttonTextColor="#ffffff"
            subscribeStatus={isSubscribed}
            initialText={
              <span className="group inline-flex items-center">
                Subscribe{" "}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            }
            changeText={
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Subscribed{" "}
              </span>
            }
            handleClick={handleSubscribeClick}
          />
        </form>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
    </section>
  );
};

export default ComingSoon;
