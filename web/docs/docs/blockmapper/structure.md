---
sidebar_position: 2
---

# Structure

Learn about block mapper structure. The block mapper is the heart of the project and controls how everything is connected when generating pages.

| FILE                                         | DESCRIPTION                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `web/components/BlockMapper/BlockMapList.ts` | List of component map imports available to the block mapper.                                                  |
| `web/components/BlockMapper/BlockMapper.tsx` | Maps contentful data to components based on block type, has an unknown block for components that don't exist. |
| `web/components/BlockMapper/BlockProps.tsx`  | Defines all component props in one place to reduce redundant code and promote code reuse.                     |
