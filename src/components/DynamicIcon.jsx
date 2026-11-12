import { 
  FlaskConical, CloudSunRain, Users, UsersRound, Microchip, Droplets, 
  UserCheck, Database, Syringe, AlertTriangle, Ticket, Bug, Bell, 
  Eye, Globe, ChevronDown, Check, HelpCircle, Home, Landmark, ShieldCheck, 
  Network, FileDown, Maximize, ArrowRight, Leaf, Truck, FileText, Headphones,
  Radio, Star, Circle
} from 'lucide-react';

const iconMap = {
  'fa-flask': FlaskConical,
  'fa-cloud-sun-rain': CloudSunRain,
  'fa-users-rectangle': Users,
  'fa-people-group': UsersRound,
  'fa-microchip': Microchip,
  'fa-water': Droplets,
  'fa-user-tie': UserCheck,
  'fa-database': Database,
  'fa-syringe': Syringe,
  'fa-exclamation-triangle': AlertTriangle,
  'fa-ticket-alt': Ticket,
  'fa-bug': Bug,
  'fa-network-wired': Network,
  'fa-file-export': FileDown,
  'fa-expand': Maximize,
  'fa-arrow-right': ArrowRight,
  'fa-bell': Bell,
  'fa-leaf': Leaf,
  'fa-eye': Eye,
  'fa-globe': Globe,
  'fa-chevron-down': ChevronDown,
  'fa-check': Check,
  'fa-question-circle': HelpCircle,
  'fa-home': Home,
  'fa-landmark': Landmark,
  'fa-shield-alt': ShieldCheck,
  'fa-satellite-dish': Radio, // Swapped Satellite for Radio
  'fa-star': Star,
  'fa-truck-fast': Truck,
  'fa-file-contract': FileText,
  'fa-headset': Headphones, // Swapped Headset for Headphones
  'fa-circle': Circle
};

export default function DynamicIcon({ name, size = 20, className = "", style, ...props }) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    return <span>?</span>;
  }
  
  return <IconComponent size={size} className={className} style={style} {...props} />;
}