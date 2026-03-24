export interface TourismServiceResponse {
    status: string;
    data: TourismService;
}

export interface TourismService {
    id: number;
    title: string;
    description: string | null;
    iconUrl: string | null;
    linkUrl: string | null;
    imageUrl: string | null;
    route: string;
    displayOrder: number;
    isActive: number;
    servicesOffered: ServiceOffered[];
    moreInformations: any[]; // Adjust to appropriate type if available
    contactDetails: any[];   // Adjust to appropriate type if available
    links: any[];            // Adjust to appropriate type if available
}

export interface ServiceOffered {
    id: number;
    discoverServiceId: number;
    type: string;
    title: string;
    description: string;
    iconUrl: string;
    phone: string | null;
    email: string | null;
    linkUrl: string | null;
    displayOrder: number;
    isActive: number;
    createdAt: string;
    updatedAt: string;
}
