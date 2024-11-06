# Application Design System
## Getting Started

Install these system dependancies (skip any that you already have installed on your PC):

- [Bun](https://bun.sh/)
- [Node](https://nodejs.org/en)

Open terminal in `./web` directory and run this command to install

```sh
bun install
```

Run the `dev` script to start the development server.

## Tech Stack

- [Astro](https://astro.build/): project framework, it is framework agnostic to give us maximum flexibility
- [React](https://react.dev): project frontend
- [Preact Signals](https://preactjs.com/guide/v10/signals/): for state management
- [Bun](https://bun.sh/): for extremely fast package management and utility testing

## Project Structure

- `./web` folder contains the frontend code
- `./api` folder contains all API code

## Making New Components

All components are found in `./web/src/components`. Here are the rules for components:

- Component folders must start with a capital letter and the folder name should be self-explainatory
- Every component must have an `index.tsx` file with a default export
- Run the `syncBlocks` script when you create a new component so it can automatically be imported in the block mapper
