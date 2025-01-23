import { AlertTriangle , CheckCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full", {
        variants: {
            variant: {
                success: "bg-emerald-100 border-emerald-400 text-emerald-700",
                warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
            }
        },
        defaultVariants:{
            variant: "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const IconMap = {
    success: CheckCheckIcon,
    warning: AlertTriangle
}

export const Banner = (
    { label, variant }: BannerProps
) => {

    const Icon = IconMap[ variant || "warning"];

    return ( 
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </div>
     );
}
