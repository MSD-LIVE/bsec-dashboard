<script>
    import { base } from '$app/paths';
    
    import { MapLibre, DeckGlLayer, MarkerLayer, Marker, Popup } from 'svelte-maplibre';
    import { GeoJsonLayer } from '@deck.gl/layers';
    import Icon from "@iconify/svelte";
    import msdLiveLogo from "$lib/img/MSD.LIVE.horiz.svg";
    import bsecLogo from "$lib/img/bsec-logo.png";

    import stations from '$lib/data/transformed/station_locations.json';
    
    const themeImages = import.meta.glob('$lib/img/bsecThemes/*.{jpg,jpeg,png}', {
        query: { enhanced: true, w: '100' },
        import: 'default',
        eager: true
    });

    const topNavItems = [
        'About',
        'Events',
        'Policies',
        'Metrics',
        'Acknowledgement',
    ];

    const bottomNavItems = [
        'Data Repository',
        'Computational Resources',
        'Projects',
        'Help',
    ];

    const scienceThemes = [
        { name: 'Vegetation, Soils, and Ecosystems', img: 'theme0.jpg', },
        { name: 'Greenhouse Gasses', img: 'theme1.jpg', },
        { name: 'Buildings and Energy', img: 'theme2.jpg', },
        { name: 'Atmospheric Dynamics', img: 'theme3.jpg', },
        { name: 'Heat problem area', img: 'theme4.png', },
        { name: 'Decarbonization problem area', img: 'theme5.png', },
        { name: 'Water and water quality', img: 'theme6.jpg', },
        { name: 'Flooding problem area', img: 'theme7.jpg', },
        { name: 'Health', img: 'theme8.jpg', },
        { name: 'Air quality', img: 'theme9.jpg', },
    ];

    const dataProducts = [
        {
            name: 'Weather Data from BSEC Weather Stations',
            authors: 'Waugh, Darryn, Lei, Hao, Collins, Shamara',
            description: 'This dataset provides measurements of temperature, humidity, rainfall, wind, and sunlight at Ambient Weather and OttHydro stations across Baltimore city. These surface weather stations were deployed by the Baltimore Social-Environmental Collaborative (BSEC) Urban Integrated Field Laboratory (UIFL) project, funded by the Department of Energy (DOE). This dataset will be periodically updated to include more stations and recent observations when available.',
            geofile: '',
            date: 'November 19, 2024',
            version: 'v2',
            tags: ['Urban', 'Climate', 'BSEC UIFL'],
            open: true,
            type: 'Observation',
            uploaded: 'November 19, 2024',
        },
        {
            name: 'Lorem Ipsum Data',
            authors: 'Mosart, Amadeus, Chopin, Frédéric',
            description: 'Frédéric François Chopin was a Polish composer and virtuoso pianist who revolutionized the piano and is considered one of the most famous Polish composers in Western music history.',
            geofile: '',
            date: 'November 19, 2024',
            version: 'v2',
            tags: ['Urban', 'Climate', 'BSEC UIFL'],
            open: true,
            type: 'Observation',
            uploaded: 'November 19, 2024',
        },
        {
            name: 'Lorem Ipsum Data',
            authors: 'Mosart, Amadeus, Chopin, Frédéric',
            description: 'Frédéric François Chopin was a Polish composer and virtuoso pianist who revolutionized the piano and is considered one of the most famous Polish composers in Western music history.',
            geofile: '',
            date: 'November 19, 2024',
            version: 'v2',
            tags: ['Urban', 'Climate', 'BSEC UIFL'],
            open: true,
            type: 'Observation',
            uploaded: 'November 19, 2024',
        },
        {
            name: 'Lorem Ipsum Data',
            authors: 'Mosart, Amadeus, Chopin, Frédéric',
            description: 'Frédéric François Chopin was a Polish composer and virtuoso pianist who revolutionized the piano and is considered one of the most famous Polish composers in Western music history.',
            geofile: '',
            date: 'November 19, 2024',
            version: 'v2',
            tags: ['Urban', 'Climate', 'BSEC UIFL'],
            open: true,
            type: 'Observation',
            uploaded: 'November 19, 2024',
        },
    ];

    let selectedTheme = $state();

    let hoveredData = $state();

    let regionalPlanningDistrictsData = $state();

    $effect(() => {
        if (!regionalPlanningDistrictsData) {
            fetch(
                `${base}/data/Baltimore_2020_Regional_Planning_Districts.geojson`
            ).then(d => d.json()).then(d => {
                regionalPlanningDistrictsData = d;
            }).catch(() => {}).finally(() => {});
        }
    });

</script>

<div
    class="
        w-full flex flex-row items-center justify-center px-4 py-2 bg-rose-700 rounded-b-sm shadow-sm
    "
>
    <span
        class="text-sm text-white"
    >
        This is just a DEMO, meant to help generate ideas on what you actually want!
    </span>
</div>

<div
    class="
        w-full px-16 py-4 bg-white
        flex flex-row items-center
    "
>
    <div class="h-12 overflow-hidden">
        <img
            src={msdLiveLogo}
            alt='MSDLIVE'
            class="h-full object-contain"
        />
    </div>
    <div class="h-12 flex flex-row ml-auto items-center gap-8">
        {#each topNavItems as item}
            <a href="" class="">
                {item}
            </a>
        {/each}
        <a href="" class="px-4 py-1 bg-gray-300 rounded-sm shadow text-xs font-semibold">
            user@domain.org
        </a>
    </div>
</div>


<div
    class="
        w-full bg-blue-900 text-white flex flex-row items-center px-16 py-5 gap-8
    "
>
    {#each bottomNavItems as item}
        <a href="" class="">
            {item}
        </a>
    {/each}
</div>

<div
    class="w-full flex flex-col gap-4 px-16 pb-4"
>
    <div
        class="
            flex flex-row items-center gap-8
        "
    >
        <img
            alt="BSEC"
            class="h-36 object-contain object-bottom"
            src={bsecLogo}
        />
        <h1
            class="pt-8 text-3xl font-semibold"
        >
            Baltimore Social-Environmental Collaborative
        </h1>
    </div>
    <p class="text-sm -mt-4">
        The mission of the Baltimore Social-Environmental Collaborative (BSEC) is to generate the climate science needed for informed climate action in Baltimore. In doing so, BSEC contributes to climate action plans for Baltimore that also improve the well-being of those who live in historically underserved neighborhoods. This means co-designing with communities climate solutions that respond to community concerns. BSEC scientists work in close partnership with Baltimore residents to guide the scientific questions being asked. As data is gathered and findings are made, the work continuously evolves in response to community needs and input.
    </p>

    <div class="flex flex-row items-end gap-4 mt-2">
        <h2 class="text-lg font-semibold leading-none">
            Science Themes
        </h2>
        <p class="text-xs font-light text-gray-700 leading-tight">
            Choose a theme to filter available data products
        </p>
    </div>
    <div
        class="flex flex-row flex-wrap gap-4"
    >
        {#each scienceThemes as t, i}
            <button
                onclick={() => {
                    if (selectedTheme === i) {
                        selectedTheme = undefined;
                    }
                    else {
                        selectedTheme = i;
                    }
                }}
                class="
                    px-3 py-2 w-56 flex flex-row items-center gap-2
                    border border-solid border-gray-400 rounded-md shadow
                    cursor-pointer hover:ring-2 ring-blue-300 hover:border-blue-400
                "
                class:ring-blue-900={selectedTheme===i}
                class:ring-2={selectedTheme===i}
                class:border-transparent={selectedTheme===i}
            >
                <div class="w-16 h-12 overflow-hidden rounded-xs shadow shrink-0">
                    <enhanced:img
                        src={themeImages[`/src/lib/img/bsecThemes/${t.img}`]}
                        alt=""
                        class="w-full h-full object-cover"
                    />
                </div>
                <p
                    class="text-sm font-semibold flex-1 text-start"
                >
                    {t.name}
                </p>
            </button>
        {/each}
    </div>
    <div
        class="
            flex flex-row gap-8 mt-2
        "
    >
        <div
            class="
                flex flex-col gap-2 flex-1 shrink-0 min-w-96
            "
        >
            <div class="flex flex-row items-end gap-4">
                <h3 class="font-semibold leading-none">
                    Data Products
                </h3>
                <p class="text-xs font-light text-gray-700 leading-tight">
                    Showing 4 of 18 products
                </p>
            </div>
            <div
                class="flex flex-col gap-2"
            >
                {#each dataProducts as d, i}
                    <div
                        role="article"
                        onmouseenter={() => {
                            hoveredData = i;
                        }}
                        onmouseleave={() => {
                            hoveredData = undefined;
                        }}
                        class="
                            w-full border-b border-solid border-gray-500
                            flex flex-col py-8 px-2
                            hover:bg-blue-500/10
                        "
                    >
                        <div
                            class="flex flex-row gap-4 mb-2"
                        >
                            <div
                                class="px-2 py-1 text-white bg-blue-500 font-semibold text-xs rounded"
                            >
                                {d.date} ({d.version})
                            </div>
                            <div
                                class="px-2 py-1 text-white bg-gray-500 font-semibold text-xs rounded"
                            >
                                {d.type}
                            </div>
                            <div
                                class="px-2 py-1 text-white bg-green-600 font-semibold text-xs rounded"
                            >
                                Open
                            </div>
                        </div>
                        <a href="" class="font-semibold text-lg text-link-blue">
                            {d.name}
                        </a>
                        <p class="text-sm text-gray-500">
                            {d.authors}
                        </p>
                        <p class="text-base line-clamp-3 mt-2">
                            {d.description}
                        </p>
                        <div
                            class="flex flex-row gap-2 my-2"
                        >
                            {#each d.tags as tag}
                                <div
                                    class="px-2 py-1 text-gray-700 bg-gray-300 font-semibold text-xs rounded"
                                >
                                    {tag}
                                </div>
                            {/each}
                        </div>
                        <p class="text-xs text-gray-500">
                            Uploaded on {d.uploaded}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
        <div
            class="
                flex flex-col gap-4 flex-1 sticky top-4 self-start
            "
        >
            <div class="flex flex-row items-end gap-4">
                <h3 class="font-semibold leading-none">
                    Data Footprint
                </h3>
                <p class="text-xs font-light text-gray-700 leading-tight">
                    Hover a data product to see its footprint
                </p>
            </div>
            <div
                class="h-96 border border-solid border-gray-700 rounded shadow overflow-hidden"
            >
                <MapLibre 
                    center={[-76.6, 39.3]}
                    zoom={11}
                    class="w-full h-full"
                    interactive={false}
                    attributionControl={false}
                    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                >
                    {#if hoveredData===0}
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
                    {#if (regionalPlanningDistrictsData && hoveredData > 0)}
                        <DeckGlLayer
                            type={GeoJsonLayer}
                            data={regionalPlanningDistrictsData}
                            stroked={true}
                            filled={true}
                            getFillColor={[1, 108, 89, 64]}
                            getLineColor={[1, 108, 89, 192]}
                            getLineWidth={25}
                        />
                    {/if}
                </MapLibre>
            </div>
        </div>
    </div>
</div>
