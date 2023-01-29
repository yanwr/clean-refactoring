import Segment from "./Segment";

export default class Ride {
    NORMAL_PRICE = 2.1;
    OVERNIGHT_PRICE = 3.9;
    SUNDAY_PRICE = 2.9;
    OVERNIGHT_SUNDAY_PRICE = 5;
    FIRST_DAY_PRICE = 1.5;
    MIN_PRICE = 10;

    segments: Segment[];

    constructor() {
        this.segments = [];
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculatePrice() {
        let totalRidePrice = 0;
        for (const segment of this.segments) {
            if(segment.isSpecialDay()) {
                totalRidePrice += segment.distance * this.FIRST_DAY_PRICE;
                continue;
            }
            if(segment.isOrvernight() && !segment.isSunday()) {
                totalRidePrice += segment.distance * this.OVERNIGHT_PRICE;
                continue;
            } 
            if(segment.isOrvernight() && segment.isSunday()) {
                totalRidePrice += segment.distance * this.OVERNIGHT_SUNDAY_PRICE;
                continue;
            }
            if(!segment.isOrvernight() && segment.isSunday()) {
                totalRidePrice += segment.distance * this.SUNDAY_PRICE;
                continue;
            } 
            totalRidePrice += segment.distance * this.NORMAL_PRICE;
        }
        return totalRidePrice < this.MIN_PRICE ? this.MIN_PRICE : totalRidePrice;
    }
}