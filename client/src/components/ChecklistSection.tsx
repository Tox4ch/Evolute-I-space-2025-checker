import ChecklistItem from "./ChecklistItem";

interface ChecklistItemData {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistSectionProps {
  title: string;
  items: ChecklistItemData[];
  onToggleItem: (id: string) => void;
}

export default function ChecklistSection({
  title,
  items,
  onToggleItem,
}: ChecklistSectionProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="text-sm font-medium text-gray-600">
            {completedCount} / {totalCount}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{percentage}% выполнено</p>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <ChecklistItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={onToggleItem}
          />
        ))}
      </div>
    </div>
  );
}
