import { ApiFrontResponse } from "@/pages/api/reddit/front";
import { useQuery } from "react-query";
import { apiClient } from "./client";

export function fetchFront(limit: number): Promise<ApiFrontResponse> {
  return apiClient
    .get(`/front?limit=${limit}`)
    .then((response) => response.data);
}

export function useFront(limit: number = 25) {
  return useQuery(["front"], () => fetchFront(limit));
}
