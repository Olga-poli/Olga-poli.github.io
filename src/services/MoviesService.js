class MoviesService {
  apiKey = '85b46e72155425cfce719a24dc2c3748';

  async getResource() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received status ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
}

export default MoviesService;
