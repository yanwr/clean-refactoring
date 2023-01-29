import FareCalculator from "./FareCalculatorStrategy";
import Segment from "./Segment";

export default class OvernightFareCalculator implements FareCalculator {
    FARE = 3.9;

    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}