import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const StudentTemplate = ({ data, location }) => {
  const student = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={student.frontmatter.name} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{student.frontmatter.name}</h1>
          <p>{student.frontmatter.status}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: student.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
    </Layout>
  )
}

export default StudentTemplate

export const studentQuery = graphql`
  query StudentBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        status
      }
    }
  }
`
