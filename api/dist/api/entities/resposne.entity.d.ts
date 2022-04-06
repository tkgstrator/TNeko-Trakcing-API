export declare class ResponseEntity {
    constructor(html: string);
    results: SummaryEntity[];
}
export declare class SummaryEntity {
    tracking_id: number;
    product_name: string;
    estimate_arrival_date: string;
    details: DetailEntity[];
}
export declare class DetailEntity {
    title: string;
    branch_name: string;
    arrival_date: string;
}
