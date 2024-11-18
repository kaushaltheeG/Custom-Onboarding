import { CSSObject, Interpolation, css } from "styled-components";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const SESSION_STORAGE_ONBOARDING_KEY = 'current_customer_oboarding';
export const SESSION_STORAGE_FORM_STATE = 'form_state';

export const allMonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const daysInMonthList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

const startYear = 1940;
const currentYear = new Date().getFullYear();
export const yearsList = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

export const stateAcronymList = [
    "AL", // Alabama
    "AK", // Alaska
    "AZ", // Arizona
    "AR", // Arkansas
    "CA", // California
    "CO", // Colorado
    "CT", // Connecticut
    "DE", // Delaware
    "FL", // Florida
    "GA", // Georgia
    "HI", // Hawaii
    "ID", // Idaho
    "IL", // Illinois
    "IN", // Indiana
    "IA", // Iowa
    "KS", // Kansas
    "KY", // Kentucky
    "LA", // Louisiana
    "ME", // Maine
    "MD", // Maryland
    "MA", // Massachusetts
    "MI", // Michigan
    "MN", // Minnesota
    "MS", // Mississippi
    "MO", // Missouri
    "MT", // Montana
    "NE", // Nebraska
    "NV", // Nevada
    "NH", // New Hampshire
    "NJ", // New Jersey
    "NM", // New Mexico
    "NY", // New York
    "NC", // North Carolina
    "ND", // North Dakota
    "OH", // Ohio
    "OK", // Oklahoma
    "OR", // Oregon
    "PA", // Pennsylvania
    "RI", // Rhode Island
    "SC", // South Carolina
    "SD", // South Dakota
    "TN", // Tennessee
    "TX", // Texas
    "UT", // Utah
    "VT", // Vermont
    "VA", // Virginia
    "WA", // Washington
    "WV", // West Virginia
    "WI", // Wisconsin
    "WY"  // Wyoming
];
const makeMediaQuery = (
  fn: (first: TemplateStringsArray | CSSObject, ...args: any[]) => Interpolation<any>
) => fn;

export const mobileOnly = makeMediaQuery(
  (first, ...args) => css`
    @media (max-width: 896px) {
      ${css(first, ...args)}
    }
  `
);
