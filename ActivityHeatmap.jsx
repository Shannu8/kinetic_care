import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { activityHeatmapData } from "../../lib/mockData";

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function getColor(value) {
  if (value === 0) return "bg-muted";
  if (value <= 1) return "bg-primary/20";
  if (value <= 2) return "bg-primary/35";
  if (value <= 3) return "bg-primary/50";
  if (value <= 4) return "bg-primary/70";
  return "bg-primary";
}

export default function ActivityHeatmap() {
  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Activity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-[10px] text-muted-foreground" />
              {days.map(d => (
                <div key={d} className="text-[10px] text-muted-foreground text-center font-medium">{d}</div>
              ))}
            </div>
            {/* Heatmap cells */}
            <TooltipProvider>
              {activityHeatmapData.map((row) => (
                <div key={row.hour} className="grid grid-cols-8 gap-1 mb-1">
                  <div className="text-[10px] text-muted-foreground flex items-center">{row.hour}</div>
                  {dayKeys.map((day) => (
                    <Tooltip key={day}>
                      <TooltipTrigger>
                        <div className={`w-full aspect-square rounded-sm ${getColor(row[day])} transition-colors hover:ring-2 hover:ring-primary/30`} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{row.hour} {day.charAt(0).toUpperCase() + day.slice(1)}: {row[day]} interactions</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </TooltipProvider>
            {/* Legend */}
            <div className="flex items-center justify-end gap-1 mt-3">
              <span className="text-[10px] text-muted-foreground mr-1">Less</span>
              {[0, 1, 2, 3, 4, 5].map(v => (
                <div key={v} className={`w-3 h-3 rounded-sm ${getColor(v)}`} />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
