export interface MobilityServiceResponse {
    status: string;
    data: MobilityService;
}

export interface MobilityService {
    id: number;
    title: string;
    description: string | null;
    iconUrl: string | null;
    linkUrl: string | null;
    imageUrl: string | null;
    route: string;
    displayOrder: number;
    isActive: number;
    servicesOffered: ServiceItem[];
    moreInformations: InfoItem[];
    contactDetails: ContactItem[];
    links: LinkItem[];
}

export interface BaseItem {
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

export interface ServiceItem extends BaseItem {
    type: "service";
}

export interface InfoItem extends BaseItem {
    type: "info";
}

export interface ContactItem extends BaseItem {
    type: "contact";
}

export interface LinkItem extends BaseItem {
    type: "link";
}
