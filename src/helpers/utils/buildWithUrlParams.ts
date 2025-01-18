export const buildUrlWithParams = (
  baseUrl: string,
  params: Record<string, string | number | undefined | null>
): string => {
  const queryParams = new URLSearchParams();

  for (let key in params) {
    if (params[key] === null || typeof params[key] === 'undefined') continue;

    const value = String(params[key]);

    queryParams.append(key, value);
  }

  const queryString = String(queryParams);

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
