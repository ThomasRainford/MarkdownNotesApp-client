import { getTimeSince } from "../utils/getTimeSince";

describe("getTimeSince", () => {
  it('returns "1 year" for a date that is one year in the past', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    expect(getTimeSince(date)).toEqual("1 year");
  });

  it('returns "1 month" for a date that is one month in the past', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    expect(getTimeSince(date)).toEqual("1 month");
  });

  it('returns "1 day" for a date that is one day in the past', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(getTimeSince(date)).toEqual("1 day");
  });

  it('returns "1 hour" for a date that is one hour in the past', () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    expect(getTimeSince(date)).toEqual("1 hour");
  });

  it('returns "1 minute" for a date that is one minute in the past', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    expect(getTimeSince(date)).toEqual("1 minute");
  });

  it('returns "1 second" for a date that is one second in the past', () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 1);
    expect(getTimeSince(date)).toEqual("1 second");
  });
});
