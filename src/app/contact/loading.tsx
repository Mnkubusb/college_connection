"use server"
import NumberTicker from '@/components/ui/number-ticker';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
        <NumberTicker value={100} direction="up" />
      </p>
    </div>
  );
};

export default Loading;