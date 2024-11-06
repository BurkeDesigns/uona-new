---
sidebar_position: 1
---

# Overview

Learn the basics about the block mapper.

## Setup

1. Check and add any missing map files in `web/components/BlockMapper/BlockMapList.ts` that you need and follow the instructions in that file.

## Important Things To Note

1. You should NEVER need to modify the `web/components/BlockMapper/BlockMapper.tsx`, but if you really need to, I left examples on how to do it in the comments of that file.

## Creating Components

1. Look at example component found in `web/components/Template`
2. You can use the same `_map.tsx` file for any component (no changes necessary)
3. You no longer need to create a typescript interface for your component since all new props should be defined in `web/components/BlockMapper/BlockProps.tsx`

## Creating New Component Props

1. Do not do redundant work, if your prop already exists in the `web/components/BlockMapper/BlockProps.tsx` file, then use that name for your component's schema file field name.
2. Add your prop as optional to the `Props` interface inside `web/components/BlockMapper/BlockProps.tsx`
3. Add your prop to the `block.fields` variable
4. Add your prop to `BlockMap` object
