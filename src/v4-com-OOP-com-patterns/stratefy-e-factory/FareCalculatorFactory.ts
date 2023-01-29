import NormalFareCalculator from "./NormalFareCalculator";
import OvernightFareCalculator from "./OvernightFareCalculator";
import OvernightSundayFareCalculator from "./OvernightSundayFareCalculator";
import Segment from "./Segment";
import SpecialDayFareCalculator from "./SpecialDayFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory {
    static create(segment: Segment) {
        if(segment.isSpecialDay()) {
            return new SpecialDayFareCalculator();
        }
        if(segment.isOrvernight() && !segment.isSunday()) {
            return new OvernightFareCalculator();
        } 
        if(segment.isOrvernight() && segment.isSunday()) {
           return new OvernightSundayFareCalculator();
        }
        if(!segment.isOrvernight() && segment.isSunday()) {
            return new SundayFareCalculator();
        }
        if(!segment.isOrvernight() && !segment.isSunday()) {
            return new NormalFareCalculator();
        }
        throw new Error();
    }
}