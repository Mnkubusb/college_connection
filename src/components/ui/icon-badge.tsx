import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                secondary: "bg-secondary",
                success: "bg-emerald-100",
                destructive: "bg-destructive",
            },
            size: {
                default: "p-2",
                sm: "p-1",
                lg: "p-2",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "dark:text-sky-400 text-white",
            secondary: "text-secondary-foreground",
            success: "text-emerald-700",
            destructive: "text-destructive-foreground",
        },
        size: {
            default: "w-8 h-8",
            sm: "w-4 h-4",
            lg: "w-6 h-6",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})


type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
    icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    )
}