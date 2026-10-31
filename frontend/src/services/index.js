import ApiClient from "./ApiClient";
import ProblemService from "./ProblemService";
import HistoryService from "./HistoryService";

const client = new ApiClient();

export const problemService = new ProblemService(client);
export const historyService = new HistoryService(client);
