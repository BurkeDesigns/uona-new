---
sidebar_position: 2
---

# Project Structure

Learn about how the project is structured.

| FOLDER                   | DESCRIPTION                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `web`                    | Website content directory                                           |
| `web/pages`              | Folder that contains all pages                                      |
| `web/components`         | All website components accross the site                             |
| `web/util`               | Reusable utility scripts that can be accessed in any component/page |
| `web/schemas/contentful` | Stores contentful schemas                                           |
| `web/public`             | Publically available assets that are available in the build         |
| `web/data`               | Data imported during build from the CMS and other sources           |

## Pages

Pages are either statically created or dynamically generated in the `web/pages` folder. Dynamically generated pages use the block mapper to map Contentful objects/data to project components.
