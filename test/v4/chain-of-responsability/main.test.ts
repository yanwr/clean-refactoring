import NormalFareCalculatorHandler from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/OvernightSundayFareCalculatorHandler";
import Ride from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/Ride";
import SpecialDayFareCalculatorHandler from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/SpecialDayFareCalculatorHandler";
import SundayFareCalculatorHandler from "../../../src/v4-com-OOP-com-patterns/chain-of-responsability/SundayFareCalculatorHandler";

let ride: Ride;
beforeEach(function() {
    const normalFareCalculator = new NormalFareCalculatorHandler();
    const overnightFareCalculator = new OvernightFareCalculatorHandler(normalFareCalculator);
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler(overnightFareCalculator);
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator);
    const specialFareCalculator = new SpecialDayFareCalculatorHandler(sundayFareCalculator);
    ride = new Ride(specialFareCalculator);
});

test("Deve calcular uma corrida no primeiro dia do mes", function () {
    ride.addSegment(10, new Date("2021-01-01T10:00:00"));
    expect(ride.calculateFare()).toBe(15);
});

test("Deve calcular uma corrida seg-sab de dia", function () {
    ride.addSegment(10, new Date("2021-03-02T10:00:00"));
    expect(ride.calculateFare()).toBe(21);
});

test("Deve calcular uma corrida em horario noturno", function () {
    ride.addSegment(10, new Date("2021-03-02T23:00:00"));
    expect(ride.calculateFare()).toBe(39);
});

test("Deve calcular uma corrida no domingo de dia", function () {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    expect(ride.calculateFare()).toBe(29);
});

test("Deve calcular uma corrida no domingo de noite", function () {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    expect(ride.calculateFare()).toBe(50);
});

test("Nao deve calcular um corrida com distancia invalida <= 0", function () {
    expect(() => ride.addSegment(-10, new Date("2021-03-01T10:00:00")) ).toThrow(new Error("Invalid distance"));
});

test("Nao deve calcular um corrida com data invalida", function () {
    expect(() => ride.addSegment(10, new Date("abcdef")) ).toThrow(new Error("Invalid date"));
});

test("Deve calcular uma corrida com valor minimo", function () {
    ride.addSegment(3, new Date("2021-03-07T10:00:00"));
    expect(ride.calculateFare()).toBe(10);
});