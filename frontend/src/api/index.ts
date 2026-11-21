import * as sampleApi from "./sample-data";
import * as realApi from "./registrationsApi";

const useSampleData = import.meta.env.VITE_USE_SAMPLE_DATA === "true";

const api = useSampleData ? sampleApi : realApi;

export const getRegistrations = api.getRegistrations;
export const getSummary = api.getSummary;