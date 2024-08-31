const baseURL = "https://api.themoviedb.org"

interface Props {
  url: string
  options?: any
}

export default async function baseFetch({url, options}: Props) {
  // Determine the prefix for api key
  const queryPrefix = url.includes('?') ? '&' : '?';

  try {
    const response = await fetch(`${baseURL}${url}${queryPrefix}api_key=${process.env.API_KEY}`, options)

    if (!response.ok) {
      return response.statusText
    }

    const data = await response.json()

    return data
  } catch (err) {
    console.error(err)
  }
}