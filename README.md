# Sway Backend
Sway is an application that allows party-goers to request songs at events, making it easier for DJs to manage and play music requests. Users can join a room via a unique code and submit their song requests anonymously or with their name, while DJs can manage and prioritize requests in real-time. The app leverages the Spotify API to allow users to search and select songs from Spotify's vast catalog, streamlining the song request process for both attendees and DJs.

## getting started
these instructions will help you set up the project locally for development.

### prerequisites

- node (v18+)
- pnpm (or npm/yarn)

### installation

1. clone the repository:

   ```bash
   git clone https://github.com/jordansmalls/sway-backend.git
   cd sway-backend
   ```
2. install the dependencies:

    ```bash
    pnpm install
    ```
3. create a .env file in the root directory and add your environment variables (PORT, DB_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, etc.):

    ```bash
    touch .env
    ```

4. run the development server:

   ```bash
   pnpm dev
   ```

   the server will be available at [http://localhost:8080](http://localhost:8080).


### scripts

- `pnpm dev` – starts the development server with hot-reloading using nodemon.
- `pnpm build` – compiles the typescript files into javascript.
- `pnpm start` – starts the production server after building the app.

### API endpoints

#### `GET /`
returns a simple "Server is running" message.

#### `GET /test`
returns a test response with the current server port.


## license

this project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.