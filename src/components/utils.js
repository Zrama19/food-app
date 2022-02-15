export const BASE_URL = `https://api.edamam.com/api/recipes/v2/b4dadfbd094da0086d5759f92e9db359?type=public&app_id=8cf35d14&app_key=bcaa0fad1b335e61b667cfe9d5fce7b0`;

export const fetchApi = async () => {
  try {
    const result = await fetch(BASE_URL);
    const data = await result.json();

    return data.recipe;
  } catch (err) {
    console.log(err);
    return null;
  }
};
