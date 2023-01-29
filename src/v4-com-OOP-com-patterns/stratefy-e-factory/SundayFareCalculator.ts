import FareCalculator from "./FareCalculatorStrategy";
import Segment from "./Segment";

export default class SundayFareCalculator implements FareCalculator {
    FARE = 2.9;

    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}