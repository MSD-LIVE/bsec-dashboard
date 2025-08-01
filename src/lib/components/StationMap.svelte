<script>
    import { base } from '$app/paths';
    import Icon from "@iconify/svelte";
    import { MapLibre, Popup, Marker } from 'svelte-maplibre';
    import PopRock from './PopRock.svelte';
    import { COLOR_CLASSES, STATION_TYPE_COLORS } from '$lib/colors';

    const MAP_STYLES = {
        "light": "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        "satellite": `${base}/satellite.json`,
    }

    let {
        selectedStations = [],
        selectedStationsColorIndex = [],
        toggleStation = () => {},
    } = $props();

    let stations = $state();

    let mapStyle = $state(MAP_STYLES.light);

    $effect(() => {
        fetch(`${base}/data/station_locations.json`).then(d => d.json()).then(d => {
            stations = d;
        })
    })

</script>

<div
    class="w-full h-full min-h-96 relative flex flex-col items-center"
>
    <MapLibre
        center={[-76.6, 39.3]}
        zoom={11}
        standardControls
        style={mapStyle}
        class="w-full h-full min-h-96 overflow-hidden"
        cooperativeGestures
    >
        {#each stations?.features as { properties, geometry }}
            <Marker
                id={properties.station_id}
                lngLat={geometry?.coordinates}
                class="
                    rounded-full cursor-pointer border border-black
                    {selectedStations.includes(properties.station_id)
                        ? `w-5 h-5 ${COLOR_CLASSES[selectedStationsColorIndex[selectedStations.indexOf(properties.station_id)]]}`
                        : `w-3 h-3 ${STATION_TYPE_COLORS[properties.station_type]}`
                    }
                "
                onclick={() => { toggleStation(properties.station_id) }}
            >
                <Popup openOn='hover'>
                    <PopRock properties={properties} />
                </Popup>
            </Marker>
        {/each}   
    </MapLibre>
    <div
        class="
            absolute bottom-12
            bg-white border-gray-300 border p-2 flex flex-row items-center gap-4
        "
    >
        <div class="flex flex-row items-center gap-2">
            <span>Base map:</span>
            <button
                disabled={mapStyle === MAP_STYLES.satellite}
                onclick={() => {mapStyle=MAP_STYLES.satellite}}
                class="
                    border rounded-sm p-1
                    {mapStyle === MAP_STYLES.satellite ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-blue-400 text-blue-400 shadow cursor-pointer'}
                "
            >
                <Icon class="" icon="gis:satellite-earth" width=24 height=24 />
            </button>
            <button
                disabled={mapStyle === MAP_STYLES.light}
                onclick={() => {mapStyle=MAP_STYLES.light}}
                class="
                    border rounded-sm p-1
                    {mapStyle === MAP_STYLES.light ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-blue-400 text-blue-400 shadow cursor-pointer'}
                "
            >
                <Icon class="" icon="emojione-monotone:world-map" width=24 height=24 />
            </button>
        </div>
        <div class="flex flex-row items-center gap-2">
            <span>Station Type:</span>
            {#each Object.keys(STATION_TYPE_COLORS) as t}
                <div class="flex flex-row items-center gap-1">
                    <div class="w-3 h-3 rounded-full border border-black {STATION_TYPE_COLORS[t]}"></div>
                    <span>{t}</span>
                </div>
            {/each}
        </div>
    </div>
</div>
