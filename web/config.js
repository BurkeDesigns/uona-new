import { createClient } from "@sanity/client";
import config from "../sanity.config";
// read-only API token
// export const sanityToken = "skWJksxrOgAMaX3fatEGUjb1QvkTeM1ofCb6yexBV4UlKasSDhp4hLWxhKL3DD2kUqEsWslPjVYCYnpU3lGhnlynvmD6NUYYaJ8tj46k2H189vpDocHXVPWvAaYXN7aGf8H2r3Gw1L8a1iWPVrXWFekQDtMxkBG2hPXMMiWO9hbvcumouoCv"; // Pine Hills

export const sanityToken =
  "sk4GFWZvZCiqgmduR4Ib2D2AHbJZmIyQcZowwe4zbS3s5XWcqUqcp7XRn1THW1GcuBNYqGUwwDSq5jfPan9NmobwL1Tvtojx15PErnygUIVU9NOUTKejQ3iMJfcPQMsREyQqKnMGcBVJBTv8GHLpOL6GvJzx9YgEbg19678bkffUWBYkTGBB"; // KMC

export const sanity = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  token: sanityToken,
  apiVersion: "2024-03-20",
  // perspective: "previewDrafts",
});
