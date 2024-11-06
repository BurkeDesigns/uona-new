import { sanity } from "@config";
import config from "../../../../sanity.config";

const baseUrl = `https://${config.sanity.projectId}.api.sanity.io/v2024-04-16`;
const query = `
  *[_type == "siteConfig"][0]{
    ...,
    "imageLink": logo{
      "url": asset->url,
    },
    mainNavLinks[]{
      ...,
      url{
        ...,
        slug{
          "current": *[_id == ^._ref][0]{
            "current": select(^._type == "pageLink" => slug.current)
          }.current,
          ...
        }
      }
    },
    footerConfig{
      ...,
      "imageLink": logo{
        "url": asset->url,
      },
      col1[]{
        ...,
        url{
          ...,
          slug{
            "current": *[_id == ^._ref][0]{
              "current": select(^._type == "pageLink" => slug.current)
            }.current,
            ...
          }
        }
      }
    },
    bottomFooterConfig{
      ...,
      bottomCol1[]{
        ...,
        url{
          ...,
          slug{
            "current": *[_id == ^._ref][0]{
              "current": select(^._type == "pageLink" => slug.current)
            }.current,
            ...
          }
        }
      }
    }
  }
`;

let res;
res = await fetch(`${baseUrl}/data/query/production?query=${query}`);
res = await res.json();

// write to file system
Bun.write('./src/data/layout.ts', `export const siteData = ${JSON.stringify(res.result, null, 4)};`);