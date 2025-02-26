import axios from 'axios';

const API_URL = 'https://ikawalieridiakashi.it/wp-json/wp/v2/posts'; 

export const fetchPosts = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        per_page: perPage,
        _embed: true, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Errore nel caricamento degli articoli:', error);
    return [];
  }
};