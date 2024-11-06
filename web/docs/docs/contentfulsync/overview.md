---
sidebar_position: 1
---

# Overview

Learn about how Contentful Sync works.

## What it does?

1. Keeps Contentful Content Types up-to-date and uses Contentful's CMS as the source of truth
2. Converts all files in a specific directory (`web/schemas/contentful/`) including at least 2 levels of subdirectories so you are free to organize them as you wish
3. It supports Javascript and Typescript schema files
4. Exposes all API functions so you can reuse/import any function of this API
5. Ignores files that start with a `.`, `_`, and all non-javascript files
6. Only uploads the most recent changes to contentful
7. Saves new conponents and changes as a draft or can publish in the CMS

## What it does not do

1. Delete files in Contentful

## How to use it

1. Run `yarn syncContentful`
2. Thats it!!!

## RULES to follow!

1. All schema file names must be unique inside the "contentfulSchemaFolder", even when they are in different subdirectories
2. Only one person should update the same component at a time

## Configuration

Ignore this section if the project is already setup.

1. Configure any variables you want in the "CONFIGURE CONTENTFUL API" section found in `web/schemas/contentfulConfig.js`
2. Create a file called `_schema.js` in `web/schemas/contentful`
3. Run the export function called "run" during the build process and thats it!!!
