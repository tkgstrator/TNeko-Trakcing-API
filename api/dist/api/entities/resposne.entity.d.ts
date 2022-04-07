export declare class DetailResponse {
    title: string;
    branch_name: string;
    arrival_date: string;
}
export declare class SummaryResponse {
    tracking_id: number;
    product_name: string;
    estimate_arrival_date: string;
    details: DetailResponse[];
}
export declare class TrackingResponse {
    constructor(html: string);
    results: SummaryResponse[];
}
