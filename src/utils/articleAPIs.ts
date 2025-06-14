import { GET_ARTICLES, GET_MORE_ARTICLES } from "./APIs"
import API from "./AppService"

export const fetchArticles = (perPage: number) => {
    return API.get(GET_ARTICLES(perPage))
}

export const fetchMoreArticles = (perPage: string) => {
    return API.get(GET_MORE_ARTICLES(perPage))
}