<script>
    import { base } from '$app/paths';
    import { MapLibre, Popup, Marker } from 'svelte-maplibre';
    import PopRock from './PopRock.svelte';
    import { COLOR_CLASSES, STATION_TYPE_COLORS } from '$lib/colors';

    let {
        selectedStations = $bindable([]),
        toggleStation = () => {},
    } = $props();

    let stations = $state();

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
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
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
                        ? `w-5 h-5 ${COLOR_CLASSES[selectedStations.indexOf(properties.station_id)]}`
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
            absolute bottom-12 pointer-events-none
            bg-white border-gray-300 border p-2 flex flex-row items-center gap-2
        "
    >
        <span>Station Type:</span>
        {#each Object.keys(STATION_TYPE_COLORS) as t}
            <div class="flex flex-row items-center gap-1">
                <div class="w-3 h-3 rounded-full border border-black {STATION_TYPE_COLORS[t]}"></div>
                <span>{t}</span>
            </div>
        {/each}
    </div>
</div>
