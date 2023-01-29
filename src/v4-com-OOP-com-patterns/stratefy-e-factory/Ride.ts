import FareCalculatorFactory from "./FareCalculatorFactory";
import Segment from "./Segment";

export default class Ride {
    MIN_PRICE = 10;

    segments: Segment[];

    constructor() {
        this.segments = [];
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculateFare() {
        let fare = 0;
        for (const segment of this.segments) {
            const fareCalculator = FareCalculatorFactory.create(segment);
            fare += fareCalculator.calculate(segment);
        }
        return fare < this.MIN_PRICE ? this.MIN_PRICE : fare;
    }
}