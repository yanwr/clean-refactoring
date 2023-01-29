import FareCalculatorHandler from "./FareCalculatorHandlerChainOfResponsability";
import Segment from "./Segment";

export default class OvernightSundayFareCalculatorHandler implements FareCalculatorHandler {
    FARE = 5;
    next?: FareCalculatorHandler;

    constructor(next?: FareCalculatorHandler) {
        this.next = next;
    }

    calculate(segment: Segment): number {
        if(segment.isOrvernight() && segment.isSunday()) {
            return segment.distance * this.FARE;
        }
        if(!this.next) throw new Error();
        return this.next.calculate(segment);
    }
}