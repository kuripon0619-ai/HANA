export interface ServiceItem {
  name: string;
  price: number;
  description?: string;
}

export interface ServiceSection {
  title: string;
  items: ServiceItem[];
}

export default function ServiceSection({ title, items }: ServiceSection) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
            <span className="font-medium">¥{item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 