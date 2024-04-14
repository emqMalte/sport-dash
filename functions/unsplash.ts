interface Env {
  UNSPLASH_APPLICATION_ID: string;
  UNSPLASH_ACCESS_KEY: string;
  UNSPLASH_SECRET_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL("https://api.unsplash.com/photos/random");

  const urlParams = new URLSearchParams();
  urlParams.append("query", "ballpark major league baseball MLB");
  urlParams.append("orientation", "landscape");
  urlParams.append("count", "1");

  url.search = urlParams.toString();

  let response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${context.env.UNSPLASH_ACCESS_KEY}`,
    },
    cf: { cacheEverything: true, cacheTtl: 900 },
  });

  response = new Response(response.body, response);
  response.headers.set("Cache-Control", "public, max-age=900");

  return response;
};
