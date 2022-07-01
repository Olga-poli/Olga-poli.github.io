class MoviesService {
  static apiKey = '85b46e72155425cfce719a24dc2c3748';

  static URL = 'https://api.themoviedb.org';

  static async getResource() {
    const url = `${MoviesService.URL}/3/movie/popular?api_key=${MoviesService.apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch url, received status ${response.status}`);
    }
    return response.json();
  }

  static async getMovieCredits(movieId) {
    const creditsURL = `${MoviesService.URL}/3/movie/${movieId}/credits?api_key=${MoviesService.apiKey}&language=en-US&page=1`;
    const response = await fetch(creditsURL);
    if (!response.ok) {
      throw new Error(`Could not fetch url, received status ${response.status}`);
    }
    return response.json();
  }

  static async getMovieInfo(movieId) {
    const movieInfoURL = `${MoviesService.URL}/3/movie/${movieId}?api_key=${MoviesService.apiKey}&language=en-US&page=1`;
    const movieInfo = await fetch(movieInfoURL);
    if (!movieInfo.ok) {
      throw new Error(`Could not fetch url, received status ${movieInfo.status}`);
    }
    const creditsURL = `${MoviesService.URL}/3/movie/${movieId}/credits?api_key=${MoviesService.apiKey}&language=en-US&page=1`;
    const creditsInfo = await fetch(creditsURL);
    if (!creditsInfo.ok) {
      throw new Error(`Could not fetch url, received status ${creditsInfo.status}`);
    }
    const movie = await movieInfo.json();
    const credits = await creditsInfo.json();
    return { ...movie, credits };
  }

  static async getActorID(actorName) {
    const actorIdURL = `${MoviesService.URL}/3/search/person?api_key=${MoviesService.apiKey}&query=${actorName}`;
    const response = await fetch(actorIdURL);
    if (!response.ok) {
      throw new Error(`Could not fetch url, received status ${response.status}`);
    }
    const actorBaseInfo = await response.json();
    return actorBaseInfo.results[0].id;
  }

  static async getActorInfo(actorName) {
    const actorIdURL = `${MoviesService.URL}/3/search/person?api_key=${MoviesService.apiKey}&query=${actorName}`;
    const getActorID = await fetch(actorIdURL);
    if (!getActorID.ok) {
      throw new Error(`Could not fetch url, received status ${getActorID.status}`);
    }
    const actorId = await getActorID.json();
    const actorInfoURL = `${MoviesService.URL}/3/person/${actorId.results[0].id}?api_key=${MoviesService.apiKey}&language=en-US&page=1&include_adult=false`;
    const getActorInfo = await fetch(actorInfoURL);
    if (!getActorInfo.ok) {
      throw new Error(`Could not fetch url, received status ${getActorInfo.status}`);
    }
    return getActorInfo.json();
  }
}

export default MoviesService;
