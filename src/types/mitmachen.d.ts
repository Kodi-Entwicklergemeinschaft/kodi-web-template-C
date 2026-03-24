// types.ts

export interface Service {
    id: number;
    discoverServiceId: number;
    type: string;
    title: string;
    description: string | null;
    iconUrl: string | null;
    phone: string | null;
    email: string | null;
    linkUrl: string | null;
    displayOrder: number;
    isActive: number;
    createdAt: string;
    updatedAt: string;
}

export interface DiscoverService {
    id: number;
    title: string;
    description: string;
    iconUrl: string | null;
    linkUrl: string | null;
    imageUrl: string | null;
    route: string;
    displayOrder: number;
    isActive: number;
    servicesOffered: Service[];
    moreInformations: Service[];
    contactDetails: Service[];
    links: Service[];
}

export interface DiscoverServiceResponse {
    status: string;
    data: DiscoverService;
}  