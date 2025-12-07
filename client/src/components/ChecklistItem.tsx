import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface ChecklistItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export default function ChecklistItem({
  id,
  text,
  completed,
  onToggle,
}: ChecklistItemProps) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer group"
      onClick={() => onToggle(id)}
    >
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            completed
              ? "bg-green-600 border-green-600"
              : "border-gray-300 group-hover:border-green-400"
          }`}
        >
          {completed && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
      </div>
      <p
        className={`text-sm leading-relaxed transition-all duration-200 ${
          completed
            ? "text-gray-400 line-through"
            : "text-gray-700 group-hover:text-gray-900"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
