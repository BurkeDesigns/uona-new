---
sidebar_position: 2
---

# Structure

Learn about the structure of components. Components in the `web/components` folder should be Pascal case. Every component in the project should have these five files:

| FILE                | DESCRIPTION                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `_map.tsx`          | Maps contentful data when used on a page, auto adds/formats your props, adds test data from -> `"./test.data.tsx"` |
| `index.stories.tsx` | This is the storybook file for component documentation and imports the test data from the `test.data.tsx` file     |
| `index.tsx`         | The main component file, modify it however you want                                                                |
| `styles.tsx`        | Uses `styled-components` to define styles                                                                          |
| `test.data.tsx`     | Defines the test data that will be viewable on localhost on the `/test-components` page                            |

# Example Component

An example component structure can be found in `web/components/Template`. You can ignore the `createComponentBtn.tsx` file in that folder.
