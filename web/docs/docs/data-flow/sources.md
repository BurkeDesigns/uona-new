---
sidebar_position: 2
---

# Data Sources

Learn about the various data sources in the project.

| SOURCE       | DESCRIPTION                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `Contentful` | Stores content with Contentful's CMS, schema files are accessible in -> `"web/schemas/contentful"` |
| `EV API`     | EV's API is accessible in the -> `"web/util/api/ev.ts"` file                                       |

## Ways to Access Data

1. Use the [EV API Wrapper](/docs/api/overview) in any component or in getServerSideProps
2. Check/pass data as a prop in your component
