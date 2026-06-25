import { Radio } from "lucide-react";
import { cn } from "@/components/ui";

export function RealtimeStatus({ isLive, label }: { isLive: boolean; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black shadow-sm ring-1",
        isLive ? "bg-emerald-50 text-emerald-600 ring-emerald-100" : "bg-slate-50 text-slate-500 ring-slate-200",
      )}
    >
      <Radio size={14} className={isLive ? "animate-pulse" : ""} />
      {label ?? (isLive ? "Live data" : "No live data")}
    </span>
  );
}
