import {
  Heart, Users, MapPin, Award, BookOpen, Stethoscope, TreePine,
  Sparkles, UtensilsCrossed, GraduationCap, Droplets, Wrench,
  ShieldCheck, HandHeart, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Users,
  MapPin,
  Award,
  BookOpen,
  Stethoscope,
  TreePine,
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  Droplets,
  Wrench,
  ShieldCheck,
  HandHeart,
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({ name, size = 24, className = '' }: DynamicIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return <Heart size={size} className={className} />;
  return <Icon size={size} className={className} />;
}
