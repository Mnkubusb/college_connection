"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { motion as m } from "framer-motion"


export default function ModeToggle() {

  const { theme, setTheme } = useTheme()

  const sunPath = "M51 71C62.0457 71 71 62.0457 71 51C71 39.9543 62.0457 31 51 31C39.9543 31 31 39.9543 31 51C31 62.0457 39.9543 71 51 71Z";
  const moonPath = "M51 71C62.0457 71 71 62.0457 71 51C51.3198 59.2001 43.683 48.9574 51 31C39.9543 31 31 39.9543 31 51C31 62.0457 39.9543 71 51 71Z";

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }


  const rayVariant = {
    hidden: {
      pathlength: 0,
      opacity: 0,
      scale: 0
    },
    visible: {
      pathlength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        pathlength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }
    }
  }

  return (
    <Button variant={"outline"} size={"icon"} className="p-1 absolute top-2 right-0 px-1 m-2 mr-4"
      onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
    >
      <m.svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
        <m.g
          className={"!origin-center"}
          initial={{ rotate: 0, scale: 1 }}
          animate={theme === "dark" ? { rotate: 360, scale: 2 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <m.path
            initial={{ fillOpacity: 0, strokeOpacity: 0 }}
            animate={
              theme === "dark"
                ? {
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                  stroke: "#60a5fa",
                  fill: "#60a5fa",
                  d: moonPath,
                }
                : {
                  fillOpacity: 0.35,
                  strokeOpacity: 1,
                  stroke: "#ca8a04",
                  fill: "#ca8a04",
                  d: sunPath,
                }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </m.g>
        <m.g variants={raysVariants} initial="hidden" animate={theme === 'light' ? "visible" : "hidden"} className=" stroke-yellow-600 " strokeWidth={6}>
          <m.path className="origin-center" variants={rayVariant} d="M51 1V11" />
          <m.path variants={rayVariant} d="M15 15L22 22" />
          <m.path variants={rayVariant} d="M1 51H11" />
          <m.path variants={rayVariant} d="M22 79L15 86" />
          <m.path variants={rayVariant} d="M51 91V101" />
          <m.path variants={rayVariant} d="M79 79L86 86" />
          <m.path variants={rayVariant} d="M91 51H101" />
          <m.path variants={rayVariant} d="M86 15L79 22" />
        </m.g>
      </m.svg>
    </Button>
  )
}


