export interface ServiceItem {
  name: string;
  price: number;
  description?: string;
}

export interface ServiceSection {
  title: string;
  items: ServiceItem[];
}
