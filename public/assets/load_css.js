import getURLParams from './get_url_params.js'

const { style } = JSON.parse(localStorage.getItem('variables')) || {}

const params = getURLParams()
if (params.style) {
  fetch(params.style)
    .then((response) => response.text())
    .then((response) => {
      const externalStyle = document.createElement('style')
      externalStyle.innerText = response
      document.body.appendChild(externalStyle)
    })
} else {
  if (style)
    fetch(style)
      .then((response) => response.text())
      .then((response) => {
        const externalStyle = document.createElement('style')
        externalStyle.innerText = response
        document.body.appendChild(externalStyle)
      })
}
