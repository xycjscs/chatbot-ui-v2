import { FC } from "react"

interface AnthropicSVGProps {
  height?: number
  width?: number
  className?: string
}

export const OpenrouterSVG: FC<AnthropicSVGProps> = ({
  height = 40,
  width = 40,
  className
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" overflow="visible">
      <g id="Icon">
        <circle cx="46" cy="46" fill="#fcb64d" r="13" />
        <path
          d="m44.907 26.165h2a4 4 0 0 1 4 4 0 0 0 0 1 0 0h-2a4 4 0 0 1 -4-4 0 0 0 0 1 0 0z"
          fill="#81c785"
          transform="matrix(-.991 -.136 .136 -.991 91.54 62.584)"
        />
        <path
          d="m33 46a13 13 0 0 1 8.008-12l-2.437-27.179a2 2 0 0 0 -1.992-1.821h-26.343a2 2 0 0 0 -1.992 1.821l-3.244 36.179 2.733 12.833a4 4 0 0 0 3.912 3.167h23.525a3.99 3.99 0 0 0 3.565-2.218 12.987 12.987 0 0 1 -5.735-10.782z"
          fill="#bdddf4"
        />
        <path
          d="m33 46a12.949 12.949 0 0 1 4-9.364l-2.25-17.636c-3.527.178-7.745 9.4-13.047 4.1s-9.639-4.1-9.639-4.1l-3.026 23.756 2.608 12.244h23.524l.3-1.4a12.927 12.927 0 0 1 -2.47-7.6z"
          fill="#fecc81"
        />
        <path d="m50.4 32.719a4.016 4.016 0 0 1 4.306-2.611l.99.136a1 1 0 0 0 .274-1.981l-.991-.137a5.979 5.979 0 0 0 -3.505.589 5 5 0 0 0 -4.15-3.658l-1.981-.272a.988.988 0 0 0 -.74.194 1 1 0 0 0 -.387.661 5.006 5.006 0 0 0 4.274 5.633l.348.048a5.884 5.884 0 0 0 -.38.909 13.705 13.705 0 0 0 -6.57.388l-2.322-25.886a2.982 2.982 0 0 0 -2.987-2.732h-26.343a2.986 2.986 0 0 0 -2.988 2.732l-3.248 36.179a.989.989 0 0 0 .018.3l2.737 12.83a5.024 5.024 0 0 0 4.891 3.959h23.524a4.941 4.941 0 0 0 3.87-1.87 13.989 13.989 0 1 0 11.36-25.411zm-4.169-5.793.822.113a2.973 2.973 0 0 1 1.982 1.161 3.008 3.008 0 0 1 .55 1.207l-.823-.113a3.007 3.007 0 0 1 -2.531-2.368zm-11.061 31.074h-23.524a3.013 3.013 0 0 1 -2.934-2.375l-2.702-12.686 3.23-36.028a1 1 0 0 1 1-.911h26.339a.993.993 0 0 1 .995.911l2.376 26.483a14.017 14.017 0 0 0 -2.19 1.313l-2.018-15.833a1 1 0 0 0 -1.042-.874c-1.594.081-3.063 1.392-4.618 2.779-3.052 2.724-5.091 4.192-7.671 1.612-5.65-5.649-10.411-4.41-10.611-4.354a1 1 0 0 0 -.725.837l-3.029 23.756a.993.993 0 0 0 .014.335l2.607 12.243a1 1 0 0 0 .979.792h23.524a.986.986 0 0 0 .727-.334 14.106 14.106 0 0 0 1.484 1.344 2.961 2.961 0 0 1 -2.211.99zm.774-21.717a13.956 13.956 0 0 0 -1.544 17.543l-.04.174h-21.9l-2.4-11.286 2.9-22.831c1.268-.066 4.354.24 8.036 3.923 4.1 4.1 7.751.843 10.417-1.534a15.925 15.925 0 0 1 2.5-1.969zm10.056 21.717a12 12 0 1 1 12-12 12.013 12.013 0 0 1 -12 12z" />
        <path d="m48.867 39.344-.506-.881a1 1 0 1 0 -1.734.995l.506.881a1 1 0 1 0 1.734-.995z" />
        <path d="m53.034 40.069a1 1 0 1 0 -1.734 1l.506.881a1 1 0 0 0 1.734-1z" />
        <path d="m50.542 44.1a1 1 0 1 0 -1.734 1l.506.881a1 1 0 1 0 1.734-1z" />
      </g>
    </svg>
  )
}
