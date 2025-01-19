"use server"
import NumberTicker from "@/components/ui/number-ticker";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="whitespace-pre-wrap sm:text-8xl text-4xl font-medium tracking-tighter text-black dark:text-white">
        <NumberTicker value={100} direction="up" />
      </p>
    </div>
  )
}

export default loading;
