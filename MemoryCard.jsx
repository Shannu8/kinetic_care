import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Music, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryIcons = {
  family: Users,
  event: Calendar,
  place: MapPin,
  music: Music,
  food: Heart,
  hobby: Star,
  pet: Heart,
  work: Star,
  health: Heart,
  other: Star,
};

const categoryColors = {
  family: "bg-blue-500/10 text-blue-500",
  event: "bg-purple-500/10 text-purple-500",
  place: "bg-green-500/10 text-green-500",
  music: "bg-pink-500/10 text-pink-500",
  food: "bg-amber-500/10 text-amber-500",
  hobby: "bg-teal-500/10 text-teal-500",
  pet: "bg-orange-500/10 text-orange-500",
  work: "bg-slate-500/10 text-slate-500",
  health: "bg-red-500/10 text-red-500",
  other: "bg-gray-500/10 text-gray-500",
};

export default function MemoryCard({ memory, index, onClick }) {
  const Icon = categoryIcons[memory.category] || Star;
  const colorClass = categoryColors[memory.category] || categoryColors.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(memory)}
      className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      {memory.photo_url && (
        <div className="h-40 overflow-hidden">
          <img
            src={memory.photo_url}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`${colorClass} border-0 gap-1`}>
            <Icon className="w-3 h-3" />
            {memory.category}
          </Badge>
          {memory.emotional_significance === "very_important" && (
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          )}
        </div>
        <h3 className="font-semibold text-sm line-clamp-1">{memory.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{memory.description}</p>
        {memory.people_involved && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">People:</span> {memory.people_involved}
          </p>
        )}
        {memory.date_of_memory && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{memory.date_of_memory}</p>
        )}
      </div>
    </motion.div>
  );
}
