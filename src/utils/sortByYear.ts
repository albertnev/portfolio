interface EntityWithYear {
  yearEnd?: number;
  yearStart: number;
}

export const sortByYear = (a: EntityWithYear, b: EntityWithYear) => {
  if (!b.yearEnd) {
    return 1;
  }

  if (!a.yearEnd) {
    return -1;
  }

  if (b.yearStart === a.yearStart) {
    return b.yearEnd - a.yearEnd;
  }

  return b.yearStart - a.yearStart;
};
