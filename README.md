# BSEC Weather Station Dashboard

Visualization dashboard for the [BSEC Weather Station Data](https://data.msdlive.org/records/6yawb-zyx60); built using [svelte](https://svelte.dev/) as the app framework, [maplibre-gl-js](https://github.com/dimfeld/svelte-maplibre) for the map, and [observable plot](https://observablehq.com/plot/) for the graphs.

### Data

The data is served via [hyparquet](https://github.com/hyparam/hyparquet) which allows efficient compression and partial file access. To prepare the data, first download the [record](https://data.msdlive.org/records/6yawb-zyx60) from MSD-LIVE, then use the `transform.ipynb` notebook to transform into parquet files.

Ideally, the data could be served directly from GitHub Pages, but I've found that Pages gzips the files and thus prevents the incremental file access that `hyparquet` expects. So for now you'll see that I'm serving the raw data from a Google Cloud bucket. May be best in the future to provide access through a public or anonymously authenticatable MSD-LIVE AWS bucket instead.

### Dev

Install dependencies with `npm i`. Run a local dev server with `npm run dev`. The dev server will serve the data from the local `static/data/` directory; the production code will serve from the GCP bucket.

### Deployment

Commits to the `main` branch automatically trigger a build and deployment to GitHub Pages. The MSD-LIVE BSEC project landing page embeds the GitHub Page as an iframe, so deployed changes will be picked up immediately (or once the viewer's cache clears).
