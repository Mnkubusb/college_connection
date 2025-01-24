"use server"
import NumberTicker from "@/components/ui/number-ticker"

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
        <NumberTicker value={100} direction="up" />
      </p>
    </div>
  )
}

export default loading


