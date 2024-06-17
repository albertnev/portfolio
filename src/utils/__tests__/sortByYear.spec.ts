import { sortByYear } from "../sortByYear";

describe("Util sortByYear", () => {
  it("sorts by yearStart prop in descending order", () => {
    const arrWithYears = [
      { yearEnd: 2010, yearStart: 2009 },
      { yearEnd: 2020, yearStart: 2016 },
      { yearEnd: 2015, yearStart: 2011 },
    ];
    expect(arrWithYears.slice().sort(sortByYear)).toEqual([
      arrWithYears[1],
      arrWithYears[2],
      arrWithYears[0],
    ]);
  });

  it("sorts by yearEnd prop in descending order if yearStart props are equal", () => {
    const arrWithYears = [
      { yearEnd: 2015, yearStart: 2011 },
      { yearEnd: 2020, yearStart: 2011 },
      { yearEnd: 2012, yearStart: 2011 },
    ];

    expect(arrWithYears.slice().sort(sortByYear)).toEqual([
      arrWithYears[1],
      arrWithYears[0],
      arrWithYears[2],
    ]);
  });

  it("sorts first those objects without yearEnd prop", () => {
    const arrWithYears = [
      { yearEnd: 2015, yearStart: 2012 },
      { yearEnd: 2020, yearStart: 2011 },
      { yearStart: 2011 },
    ];

    expect(arrWithYears.slice().sort(sortByYear)).toEqual([
      arrWithYears[2],
      arrWithYears[0],
      arrWithYears[1],
    ]);
  });
});
