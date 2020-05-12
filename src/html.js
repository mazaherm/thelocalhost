import PropTypes from 'prop-types'
import React from 'react'

const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`HTML File is using environment config: '${activeEnv}'`)

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <script
        src={`${process.env.GATSBY_FATHOM_TRACKING_URL_THE_LOCALHOST}/script.js`}
        spa="auto"
        site={process.env.GATSBY_FATHOM_TRACKING_ID_THE_LOCALHOST}
        defer
      ></script>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}