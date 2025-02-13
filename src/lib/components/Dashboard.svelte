<script>
    import Icon from "@iconify/svelte";
    import { tableFromIPC } from "apache-arrow";
    import * as Plot from '@observablehq/plot';
    import { MapLibre, DeckGlLayer, MarkerLayer, Marker, Popup } from 'svelte-maplibre';
    import { GeoJsonLayer } from '@deck.gl/layers';
    import { base } from '$app/paths';
    import stations from '$lib/data/transformed/station_locations.json';

    const tabs = [
        'Weather Stations',
        'Air Quality',
    ];

    let activeTab = $state(tabs[0]);

    let isFetching = $state(false);
    let selectedStationIndex = $state();
    let plotDiv = $state();
    let plotData = $state();

    let airQualityData = $state();

    $effect(() => {
        if (!airQualityData) {
            fetch(
                `${base}/data/Baltimore_2020_Regional_Planning_Districts.geojson`
            ).then(d => d.json()).then(d => {
                airQualityData = d;
            }).catch(() => {}).finally(() => {});
        }
    });
    
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
    class="flex flex-row items-end justify-start border-b border-gray-800 pb-1"
>
    {#each tabs as tab}
        <button
            onclick={() => activeTab = tab}
            class="
                w-48 text-center h-0
                border-r-[1rem] border-r-transparent
                border-b-[2rem]  box-border
                {activeTab===tab ? 'cursor-default border-b-black' : 'cursor-pointer border-b-gray-400'}
            "
        >
            <div
                class="
                    w-[calc(12rem-1px)] text-center h-0
                    border-r-[1rem] border-r-transparent
                    border-b-[2rem] border-b-white box-border
                "
            >
                <span
                    class="
                        block mt-px pt-1.5 text-sm
                        {activeTab===tab ? 'text-gray-800 font-semibold' : 'text-blue-800'}
                    "
                >
                    {tab}
                </span>
            </div>
        </button>
    {/each}
</div>
<div
    class="flex flex-row flex-wrap items-center justify-start gap-4 lg:h-[32rem]"
>
    <MapLibre 
        center={[-76.6, 39.3]}
        zoom={11}
        class="flex-1 h-[32rem] shadow-sm rounded-xs overflow-hidden min-w-96 shrink-0"
        standardControls
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
        {#if activeTab===tabs[0]}
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
        {:else if (activeTab===tabs[1])}
            {#if (airQualityData)}
                <DeckGlLayer
                    type={GeoJsonLayer}
                    data={airQualityData}
                    stroked={true}
                    filled={true}
                    getFillColor={f => [Math.floor(Math.random()*256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), 64]}
                    getLineColor={[0, 0, 0, 192]}
                    getLineWidth={25}
                />
            {/if}
        {/if}
    </MapLibre>
    <div
        class="w-full lg:w-96 h-96 lg:h-[32rem] flex flex-col items-center bg-gray-100 px-4 py-2 relative shadow-sm rounded-xs shrink-0"
    >
        <h2
            class="font-semibold text-sm text-gray-500 absolute left-4 top-2"
        >
            {#if activeTab===tabs[0]}
                STATION DATA
            {:else}
                AIR QUALITY DATA
            {/if}
        </h2>
        {#if activeTab===tabs[0]}
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
                        class="flex-1 flex items-start justify-center"
                    ></div>
                </div>
            {/if}
        {:else if activeTab===tabs[1]}
            {#if airQualityData}
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <span class="text-sm text-gray-400 italic select-none">
                        This is just random data as an example
                    </span>
                </div>
            {:else}
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <Icon
                        icon="eos-icons:bubble-loading"
                        class="text-bsec-yellow"
                        width="64"
                        height="64"
                    />
                </div>
            {/if}
        {/if}
    </div>
</div>