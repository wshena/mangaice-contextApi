import axios, { AxiosRequestConfig } from "axios";
import { includesCoverArtAuthorArtist, includesScanlationGroupMangaUser } from "./const";

// Interface untuk konfigurasi request
interface FetcherProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Hanya metode HTTP yang umum digunakan
  params?: Record<string, any>; // Menggunakan Record untuk tipe objek yang lebih fleksibel
  url: string;
}

// Fungsi fetcher
const fetcher = async ({ method, params, url }: FetcherProps) => {
  try {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/api/proxy',
      data: {
        method,
        url,
        params,
      },
    };

    const response = await axios.request(config);
    const data = response.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Fungsi untuk mendapatkan semua manga dengan limit
export const getAllMangaWithLimit = async (limit: number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: { limit },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan latest manga update
export const getLatestMangaUpdate = async (date:any, limit: number, offset: number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: { limit: limit, offset: offset },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/chapter?includes[]=scanlation_group&includes[]=manga&includes[]=user&updatedAtSince=${date}&order[updatedAt]=desc`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan cover art berdasarkan manga id
export const getCoverArtFromMangaId = async (id:string) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {  },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/cover?manga[]=${id}`,
    });

    return data.data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi mendapatkan manga yang baru ditambahkan
export const getRecentlyAddManga = async (year:any, date:any, limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?${includesCoverArtAuthorArtist}&year=${year}&createdAtSince=${date}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan best rating manga
export const getBestRatingmanga = async (limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?${includesCoverArtAuthorArtist}&order[rating]=desc&order[followedCount]=desc`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan popular manga today
export const getPopularMangaToday = async (year:any, date:any, limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?${includesCoverArtAuthorArtist}&order[followedCount]=desc&year=${year}&updatedAtSince=${date}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan rating manga berdasarkan id manga
export const getMangaRating = async (id:string) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/statistics/manga/${id}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan random data manga
export const getRandomMangaData = async () => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga/random?${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan data manga dari id
export const getMangaDataFromId = async (id:string) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga/${id}?${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan manga chapter feed
export const getMangaChapterFeed = async (id:string, limit:number, offset:number, order:string) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga/${id}/feed?${includesScanlationGroupMangaUser}&order[chapter]=${order}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// mendapatkan data manga dari title
export const getMangaFromTitle = async (title:any, limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?title=${title}&${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// mendapatkan chapter page sesuai dengan chapter id
export const getChapterPageFromSpesificChapter = async (id:any) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/at-home/server/${id}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi mendapatkan chapter feed dari chapter id spesific
export const getChapterFeedFromChapterId = async (id:any) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/chapter/${id}?${includesScanlationGroupMangaUser}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi mendapatkan chapter image dari chapter id spesific
export const getChapterImage = async (id:any) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/at-home/server/${id}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan semua chapter id dari manga tertentu
export const getChapterAggregate = async (id:any) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga/${id}/aggregate`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan semua filter tags
export const getAllTags = async () => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {},
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga/tag`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan manga dari title dan filter tags
export const getMangaFromTitleAndFilter = async (query:string, limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?${query}&${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

// fungsi untuk mendapatkan manga dari tags
export const getMangaFromTag = async (id:string, limit:number, offset:number) => {
  try {
    const data = await fetcher({
      method: 'GET',
      params: {
        limit: limit,
        offset: offset
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/manga?includedTags[]=${id}&${includesCoverArtAuthorArtist}`,
    });

    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};