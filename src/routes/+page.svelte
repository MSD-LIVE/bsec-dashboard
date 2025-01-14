<script>
    import { base } from '$app/paths';

    import * as Plot from '@observablehq/plot';
    import { MapLibre, GeoJSON, MarkerLayer, Marker, Popup } from 'svelte-maplibre';
    import { tableFromIPC } from "apache-arrow";
    import Icon from "@iconify/svelte";
    import Toggle from '$lib/components/Toggle.svelte';

    import stations from '$lib/data/transformed/station_locations.json';

    let isFetching = $state(false);

    let layers = $state([
        { name: 'Weather Stations', isOn: true, },
        { name: 'Another Layer', isOn: false, },
        { name: 'Yet Another Layer', isOn: false, },
    ]);

    let selectedStationIndex = $state();

    let plotDiv = $state();
    let plotData = $state();

    $effect(() => {
        if (selectedStationIndex !== undefined) {
            const station = stations.features[selectedStationIndex];
            const stationId = station.properties.station_id;
            const stationType = station.properties.station_type;
            const uri = `${base}/data/BSEC-${stationId}_${stationType}_daily_2024.arrow`;
            isFetching = true;
            tableFromIPC(fetch(uri)).then((table) => table.toArray().map((item) => {
                const d = item.toJSON();
                d.utc = new Date(d.obsTimeUtc + "Z");
                return d;
            })).then(d => {
                plotData = d;
            }).catch(() => {
                plotData = undefined;
                selectedStationIndex = undefined;
            }).finally(() => {
                isFetching = false;
            });
        }
        else {
            plotData = undefined;
        }
    });

    $effect(() => {
        if (plotDiv && plotData) {
            const plot = Plot.plot({
                width: 384,
                height: 256,
                x: {type: 'utc', label: 'Date'},
                y: {label: 'Average Temperature', grid: true},
                marks: [
                    Plot.line(plotData, {
                        x: 'utc',
                        y: 'tempAvg',
                    }),
                ]
            });
            plotDiv.firstChild?.remove();
            plotDiv.append(plot);
        }
    });

</script>


<div
    class="absolute top-0 left-0 w-full flex flex-row items-center justify-center px-4 py-2 bg-rose-700 rounded-b-sm shadow"
>
    <span
        class="text-sm text-white"
    >
        This is just a DEMO, meant to help generate ideas on what you actually want!
    </span>
</div>

<div
    class="w-full h-full bg-white flex flex-col items-stretch justify-start gap-4 px-4 py-2 pt-8"
>
    <div
        class="flex flex-row items-center justify-start gap-8"
    >

        <enhanced:img
            alt=''
            src='$lib/img/bsec-logo.png'
            class='w-48 h-32 object-cover'
        />

        <div
            class="flex-1 flex flex-col"
        >

            <h1
                class="font-semibold text-2xl"
            >
                BSEC Weather Station Dashboard
            </h1>

            <p
                class="font-regular text-base"
            >
                Lorem ipsum dolor sit amet...
            </p>

        </div>

    </div>

    <div
        class="flex-1 flex flex-row items-center justify-start gap-4"
    >

        <MapLibre 
            center={[-76.6, 39.3]}
            zoom={11}
            class="flex-1 h-full shadow rounded-sm overflow-hidden"
            standardControls
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
            {#if layers[0].isOn}
                {#each stations.features as { properties, geometry }, i}
                    <Marker
                        lngLat={geometry.coordinates}
                        onclick={() => (selectedStationIndex = i)}
                        class="cursor-pointer"
                    >
                        <Icon
                            icon="octicon:feed-star-16"
                            width="16" height="16"
                            class="
                                hover:scale-125 transition-transform 
                                {properties.station_type==='AWS' ? 'text-[#9d27b0]' : (properties.station_type==='OTT' ? 'text-[#0f87d1]' : 'text-[#0a7138]')}
                            "
                        />
                        <Popup openOn="hover" offset={[0, -10]}>
                            <div class="text-base">
                                {properties.site_name}
                            </div>
                        </Popup>
                    </Marker>
                {/each}
            {/if}
        </MapLibre>
        
        <div
            class="w-96 h-full flex flex-col items-center bg-gray-100 px-4 py-2 relative shadow rounded-sm"
        >
        
            <h2
                class="font-semibold text-sm text-gray-500 absolute left-4 top-2"
            >
                STATION DATA
            </h2>

            {#if selectedStationIndex===undefined}
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <span class="text-sm text-gray-400 italic select-none">
                        Select a station on the map
                    </span>
                </div>
            {:else if isFetching}
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <Icon
                        icon="eos-icons:bubble-loading"
                        class="text-bsec-yellow"
                        width="64"
                        height="64"
                    />
                </div>
            {:else}
                <button
                    class="absolute right-4 top-2 text-red-600"
                    onclick={() => {selectedStationIndex = undefined}}
                >
                    <Icon icon="mdi:close-box" width="24" height="24" />
                </button>
                <div
                    class="w-full h-full flex flex-col items-stretch justify-start mt-8"
                >
                    <h3
                        class="text-lg text-gray-700 my-2 text-center w-full"
                    >
                        {stations.features[selectedStationIndex].properties.site_name}
                    </h3>
                    <div
                        bind:this={plotDiv}
                        class="flex-1"
                    ></div>
                </div>
            {/if}

        </div>

    </div>

    <div
        class="h-24 flex flex-row items-center justify-around bg-gray-100 px-4 py-2 relative shadow rounded-sm"
    >
        
        <h2
            class="font-semibold text-sm text-gray-500 h-full absolute left-4 top-2"
        >
            LAYERS
        </h2>

        {#each layers as l}
            <div
                class="flex flex-col items-center"
            >
                <Toggle label={l.name} bind:isOn={l.isOn} />
            </div>
        {/each}

    </div>

</div>
