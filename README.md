# Morosystems FrontEnd Assignment

Simple React Todo app for Morosystems FrontEnd Assignment.

## Setup

1. Run `npm i` for dependecies installation.
2. Run `npm start` for a local dev server.
3. You can access app on `http://localhost:5173/`.

### Local BE server

This app needs Local ([Morosystems BE](https://github.com/morosystems/todo-be)) running for all features. Local server runs on `http://localhost:8080/`. If the port of BE changes, make sure to change it also in .env of FE App.

## Functionalities

:heavy_check_mark: Tasks can be added. <br>
:heavy_check_mark: Tasks can be removed and renamed.<br>
:heavy_check_mark: Tasks can be marked as completed.<br>
:heavy_check_mark: Tasks can be filtered by completed and not completed.<br>
:heavy_check_mark: All visible tasks can be marked as completed at once.<br>
:heavy_check_mark: All completed tasks can be deleted at once.<br>
:heavy_check_mark: The number of completed tasks is displayed.<br>

## App Core

- Custom build Vite + React + Typescript
- Redux + RTK Query
- ESLint + Prettier
- Material UI + TailwindCSS

## Additional Features

- Error handling with Snackbar Notification
- Customized theme for Material UI
- Optimistic updates for BE requests

## Possible Improvements

- Unit & E2E tests (Jest & Cypress)
- Input Validation (XSS)
- Improve bulk actions (toggle/delete all): BE work needed
