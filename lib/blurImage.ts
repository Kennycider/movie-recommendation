import { getPlaiceholder } from "plaiceholder"

export default async function getBlurredImageData(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (error) {
    console.error("Error generating blurred image:", error)
    return ''
  }
}