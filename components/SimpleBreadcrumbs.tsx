import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface SimpleBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function SimpleBreadcrumbs({ items }: SimpleBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <Home className="w-4 h-4" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-blue-600 transition-colors underline"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
