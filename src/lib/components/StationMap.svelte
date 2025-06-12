<script>
    import { base } from '$app/paths';
    import { MapLibre, Popup, Marker } from 'svelte-maplibre';

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
    class="w-full h-full min-h-96"
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
                    w-3 h-3 rounded-full cursor-pointer border
                    {selectedStations.includes(properties.station_id)
                        ? 'bg-amber-600/50 border-amber-600 hover:bg-red-900/50 hover:border-red-900'
                        : 'bg-blue-800/50  border-blue-800 hover:bg-green-500/50 hover:border-green-500'
                    }
                "
                onclick={() => { toggleStation(properties.station_id) }}
            >
                <Popup openOn='hover'>
                    <span>{properties.station_id}</span>
                </Popup>
            </Marker>
        {/each}   
    </MapLibre>
</div>
