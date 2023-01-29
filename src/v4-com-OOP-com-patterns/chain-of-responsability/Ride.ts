import Segment from "../stratefy-e-factory/Segment";
import FareCalculatorHandler from "./FareCalculatorHandlerChainOfResponsability";

export default class Ride {
    MIN_PRICE = 10;

    segments: Segment[];

    constructor(
        readonly fareCalculatorHanlder: FareCalculatorHandler
    ) {
        this.segments = [];
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculateFare() {
        let fare = 0;
        for (const segment of this.segments) {
            fare += this.fareCalculatorHanlder.calculate(segment);
        }
        return fare < this.MIN_PRICE ? this.MIN_PRICE : fare;
    }
}