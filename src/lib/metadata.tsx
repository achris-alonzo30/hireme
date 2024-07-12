import { Metadata } from "next"

export function constructMetadata({
    title = "Hireme",
    description = "Hireme simplifies our job application process.",
    image = "/thumbnail/HireMe-thumbnail.png",
    icons = "/svg/logo.svg",
    noIndex = false
  }: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
  } = {}): Metadata {
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: image
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
        creator: "@chrislonzo"
      },
      icons,
      metadataBase: new URL('https://hireme-silk.vercel.app'),
      ...(noIndex && {
        robots: {
          index: false,
          follow: false
        }
      })
    }
  }
  