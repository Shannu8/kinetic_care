import { Pill, Calendar, Phone, Brain, Music, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  { icon: Pill, label: "Medication\nReminder", color: "bg-red-500/10 text-red-500 hover:bg-red-500/20", action: "medication" },
  { icon: Calendar, label: "Today's\nSchedule", color: "bg-primary/10 text-primary hover:bg-primary/20", action: "schedule" },
  { icon: Phone, label: "Call\nCaregiver", color: "bg-green-500/10 text-green-500 hover:bg-green-500/20", action: "emergency" },
  { icon: Brain, label: "Memory\nGame", color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20", action: "game" },
  { icon: Music, label: "Play\nMusic", color: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20", action: "music" },
  { icon: Gamepad2, label: "Story\nTime", color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20", action: "story" },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.action}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.action)}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${action.color}`}
        >
          <action.icon className="w-7 h-7" />
          <span className="text-xs font-medium text-center whitespace-pre-line leading-tight">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
