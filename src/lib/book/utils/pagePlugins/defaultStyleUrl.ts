const css = `
  svg, img, image {
    max-width: 100%;
    object-fit: contain;
  }
  svg > image {
    max-width: 100% !important;
  }
`

const file = new File([css], "style.css", { type: "text/css" })

const url = URL.createObjectURL(file)

export default url
