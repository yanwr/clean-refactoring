import { calculateRide } from "../../src/v2-sem-OOP-mas-separado-refactor/main";

test("Deve calcular uma corrida no primeiro dia do mes", function () {
    expect(calculateRide([
        { distance: 10, date: new Date("2021-01-01T10:00:00") }
    ])).toBe(15);
});

test("Deve calcular uma corrida seg-sab de dia", function () {
    expect(calculateRide([
        { distance: 10, date: new Date("2021-03-02T10:00:00") }
    ])).toBe(21);
});

test("Deve calcular uma corrida em horario noturno", function () {
    expect(calculateRide([
        { distance: 10, date: new Date("2021-03-02T23:00:00") }
    ])).toBe(39);
});

test("Deve calcular uma corrida no domingo de dia", function () {
    expect(calculateRide([
        { distance: 10, date: new Date("2021-03-07T10:00:00") }
    ])).toBe(29);
});

test("Deve calcular uma corrida no domingo de noite", function () {
    expect(calculateRide([
        { distance: 10, date: new Date("2021-03-07T23:00:00") }
    ])).toBe(50);
});

test("Nao deve calcular um corrida com distancia invalida <= 0", function () {
    expect(() => calculateRide([{ distance: -10, date: new Date("2021-03-01T10:00:00") }])).toThrow(new Error("Invalid distance"));
});

test("Nao deve calcular um corrida com data invalida", function () {
    expect(() => calculateRide([{ distance: 10, date: new Date("abcdef") }])).toThrow(new Error("Invalid date"));
});

test("Deve calcular uma corrida com valor minimo", function () {
    expect(calculateRide([
        { distance: 3, date: new Date("2021-03-01T10:00:00") }
    ])).toBe(10);
});