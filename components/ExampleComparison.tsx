import { CheckCircle, XCircle } from "lucide-react";

interface ExampleComparisonProps {
  good: string[];
  bad: string[];
}

export function ExampleComparison({ good, bad }: ExampleComparisonProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-6 text-lg">
        📝 Příklady v praxi
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Good examples */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-green-700">
              ✅ Dobré příklady
            </h4>
          </div>
          <div className="space-y-3">
            {good.map((example, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-green-900 leading-relaxed">{example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bad examples */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-red-700">
              ❌ Špatné příklady
            </h4>
          </div>
          <div className="space-y-3">
            {bad.map((example, i) => (
              <div
                key={i}
                className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-red-900 leading-relaxed">{example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
