class MoviesService {
  static apiKey = '85b46e72155425cfce719a24dc2c3748';

  static async getResource() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MoviesService.apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch url, received status ${response.status}`);
    }
    return response.json();
  }
}

export default MoviesService;
