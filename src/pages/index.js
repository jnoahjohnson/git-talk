import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const StudentIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const students = data.allMarkdownRemark.nodes

  if (students.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All Students" />
        <p>No students here! So sad. 😭</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All Students" />
      <ol style={{ listStyle: `none` }}>
        {students.map(student => {
          const studentName = student.frontmatter.name || student.fields.slug

          return (
            <li key={student.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={student.fields.slug} itemProp="url">
                      <span itemProp="headline">{studentName}</span>
                    </Link>
                  </h2>
                  <small>{student.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        student.frontmatter.description || student.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default StudentIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          name
          status
        }
      }
    }
  }
`
