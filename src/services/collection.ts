import { ListData } from "@/models/common.type";
import { FetchCollectionParams, ICollection, TCreateCollection } from "@/models/collection.type";
import api from "./axios";
import { ApiCollections } from "./route";


export async function createCollection(
  body: TCreateCollection
): Promise<ICollection> {
  return api(ApiCollections.createCollection, body, {
    method: "POST",
  })
    .then((res) => res.data)
    .catch((err) => err);
}

export async function fetchCollections(
  params: FetchCollectionParams
): Promise<ListData<ICollection>> {
  return api(ApiCollections.fetchCollections, null, {
    method: "GET",
    params,
  })
    .then((res) => res.data)
    .catch((err) => err);
}