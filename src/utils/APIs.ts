export const API_KEY = 'pub_468e637b996543d6bb7e753372de2712';

export const GET_ARTICLES = (ARTICLES_PER_PAGE: number) =>
  `/api/1/news?apikey=${API_KEY}&language=en&q=cricket`;

export const GET_MORE_ARTICLES = (page: string) =>
  `/api/1/news?apikey=${API_KEY}&language=en&q=cricket&page=${page}`;
