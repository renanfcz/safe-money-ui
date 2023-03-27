"use client";
import { getToken, isValidToken } from "@/services/auth.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    isValidToken(getToken()).then((result)=>{
      if(result){
        router.push("/dashboard");
      } else {
        router.push("auth/signin");
      }
    }).catch(()=>{
      router.push("auth/signin");
    });
  }, []);
  return <div/>
}
