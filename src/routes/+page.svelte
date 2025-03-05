<script>
    import Icon from "@iconify/svelte";
    import MultiSelect from 'svelte-multiselect';
    import { base } from '$app/paths';
    import bsecLogo from "$lib/img/bsec-logo.png";
    import devDataRecords from "$lib/data/dev_only_records.json";
    import DataDashboard from "$lib/components/Dashboard.svelte";
    import weatherStationImg from '$lib/img/weather_station.jpg';
    import airQualityImg from '$lib/img/air_quality.jpg';
        
    const themeImages = import.meta.glob('$lib/img/bsecThemes/*.{jpg,jpeg,png}', {
        query: { enhanced: true, w: '100' },
        import: 'default',
        eager: true
    });

    const scienceThemes = [
        // { label: 'Air Quality', img: 'theme9.jpg', },
        { label: 'Biogeochemistry', img: 'theme1.jpg', },
        // { label: 'Buildings and Energy', img: 'theme2.jpg', },
        // { label: 'Health', img: 'theme8.jpg', },
        { label: 'Meteorology', img: 'theme3.jpg', },
        { label: 'Vegetation, Soils, and Ecosystems', img: 'theme0.jpg', },
        { label: 'Water and Water Quality', img: 'theme6.jpg', },
    ];

    const featuredData = [
        {
            title: 'BSEC Weather Station Data',
            summary: 'Measurements of temperature, humidity, rainfall, wind, and sunlight across Baltimore city.',
            url: 'https://data.msdlive.org/records/6yawb-zyx60/latest',
            img: weatherStationImg,
        },
        {
            title: 'BSEC Air Quality Data',
            summary: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Mus ullamcorper urna sollicitudin molestie praesent venenatis odio.',
            url: null,
            img: airQualityImg,
        }
    ];

    const sortTypes = [
        {
            name: 'Date',
            sort: (a, b) => {
                return b.metadata.publication_date.localeCompare(a.metadata.publication_date)
            },
        },
        {
            name: 'Title',
            sort: (a, b) => {
                return b.metadata.title.localeCompare(a.metadata.title, { sensitivity: 'base' })
            },
        },
    ];

    let sortType = $state(0);

    let sortDescending = $state(true);

    let selectedThemes = $state([]);

    let data = $state();

    let setSort = (i) => {
        if (sortType === i) {
            sortDescending = !sortDescending;
        }
        else {
            sortType = i;
            sortDescending = true;
        }
    };

    $effect(() => {
        if (data === undefined) {
            // TODO need to interact with the real API, but it is CORS protected
            data = devDataRecords;
        }
    });

    let filteredData = $derived(data?.hits?.hits?.filter(
        d => selectedThemes.length===0 ? true : d?.metadata?.msdlive_themes?.some(t => selectedThemes.map(t => t.label).includes(t.theme))
    ) ?? []);

    let sortedData = $derived(sortDescending ? filteredData.slice().sort(sortTypes[sortType].sort) : filteredData.slice().sort(sortTypes[sortType].sort).reverse());
    
</script>

<div
    class="w-full flex flex-col gap-4 px-8 lg:px-16 pb-4"
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

    <div class="flex flex-row flex-wrap gap-x-8 gap-y-4 -mt-6">
    
        <div class="flex-1 flex flex-col gap-1 min-w-96 ">

            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-end gap-4 mt-2">
                    <h2 class="text-lg font-semibold leading-none">
                        About
                    </h2>
                </div>
                <p class="text-base w-full">
                    The Baltimore Social-Environmental Collaborative (BSEC) is a Department of Energy Urban Integrated Field Lab program designed to generate the science needed for informed energy investments and extreme weather resilience in Baltimore. In doing so, BSEC contributes to action plans for Baltimore that improve the well-being of residents across the region. Working with businesses, local and state government representatives, and community organizations, BSEC scientists produce the decision-relevant science needed to address local priorities and needs. As data is gathered and findings discovered, the work evolves to answer questions our partners identify.
                </p>
            </div>

            <div class="flex flex-col gap-2 min-w-96">
                <div class="flex flex-row items-end gap-4 mt-4">
                    <h3 class="text-base font-medium leading-none">
                        Additional Resources
                    </h3>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row gap-2">
                        <Icon icon="tabler:point" class="text-lg mt-1"/> 
                        <p class=""><a
                            href="https://bsec.21cc.jhu.edu/"
                            class="text-link-blue hover:text-blue-900 underline underline-offset-2 whitespace-nowrap"
                            target="_blank"
                        >BSEC Homepage</a> - Follow for news and updates from the BSEC team!
                        </p>
                    </div>

                    <div class="flex flex-row gap-2">
                        <Icon icon="tabler:point" class="text-lg mt-1"/>
                        <p class=""><a
                            href="https://www.arm.gov/"
                            class="text-link-blue hover:text-blue-900 underline underline-offset-2 whitespace-nowrap"
                            target="_blank"
                        >ARM</a> - Atmospheric Radiation Measurement User Facility
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex flex-col gap-4 min-w-96 flex-1 items-start lg:items-center">

            <div class="flex flex-col gap-4 min-w-96">
                <div class="flex flex-row items-end gap-4 mt-4">
                    <h2 class="text-lg font-semibold leading-none">
                        Highlights
                    </h2>
                </div>
                <div class="px-6 pt-4 pb-5 rounded-lg shadow bg-gray-100">
                    <div
                        class="flex flex-row justify-around gap-4"
                    >
                        <div class="flex flex-col items-center w-24 shrink-0">
                            <span class="text-2xl font-semibold text-center">
                                17
                            </span>
                            <span class="text-base text-gray-700 font-semibold text-center">
                                Datasets
                            </span>
                        </div>
                        <div class="flex flex-col items-center w-24 shrink-0">
                            <span class="text-2xl font-semibold text-center">
                                312
                            </span>
                            <span class="text-base text-gray-700 font-semibold text-center">
                                Downloads
                            </span>
                        </div>
                        <div class="flex flex-col items-center w-24 shrink-0">
                            <span class="text-2xl font-semibold text-center">
                                37.54
                            </span>
                            <span class="text-base text-gray-700 font-semibold text-center">
                                Gigabytes
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-row items-end gap-4 mt-5 mb-4">
                        <h3 class="text-base font-semibold leading-none">
                            Featured Datasets
                        </h3>
                    </div>
                    <div class="flex flex-col gap-4">
                        {#each featuredData as d}
                            <a
                                href={d.url}
                                class="
                                    flex flex-row gap-2 items-center w-96 pr-2 rounded border border-solid border-gray-700
                                    group cursor-pointer overflow-hidden
                                    translate-0 hover:-translate-0.5
                                    transition-transform hover:shadow-sm
                                "
                                target=_blank
                                rel=noreferrer
                            >
                                <div class="w-32 h-20 shrink-0 overflow-hidden bg-link-blue border-r border-r-gray-700">
                                    <img
                                        src={d.img}
                                        alt=""
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div class="flex flex-col items-start justify-start h-20 flex-1">
                                    <h5
                                        class="
                                            text-link-blue w-full font-semibold text-base
                                            group-hover:underline group-hover:underline-offset-2
                                        "
                                    >
                                        {d.title} <Icon icon="mdi:external-link" class="inline-block mb-0.5 text-white group-hover:text-link-blue" />
                                    </h5>
                                    <p
                                        class="
                                            text-xs text-black line-clamp-3
                                        "
                                    >
                                        {d.summary}
                                    </p>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            </div>

        </div>

    </div>

    <div class="flex flex-row items-end gap-4 mt-4">
        <h2 class="text-lg font-semibold leading-none">
            Data Dashboard
        </h2>
        <p class="text-xs font-light text-gray-700 leading-tight">
            Explore featured datasets
        </p>
    </div>
    <DataDashboard />

    <div
        class="
            flex flex-col gap-2 flex-1 shrink-0 min-w-96 mt-4
        "
    >
        <div class="flex flex-row items-end gap-4">
            <h2 class="text-lg font-semibold leading-none">
                Data Products
            </h2>
        </div>
        <div class="p-2 flex flex-col md:flex-row md:items-end gap-4">
            <div class="flex flex-col md:flex-row md:items-end gap-x-5 gap-y-2 flex-1">
                <h3 class="text-xs uppercase shrink-0 font-semibold text-gray-700">
                    Filter by Science Theme:
                </h3>
                <MultiSelect
                    bind:selected={selectedThemes}
                    options={scienceThemes}
                    closeDropdownOnSelect
                    sortSelected
                    --sms-max-width="24rem"
                    --sms-width="100%"
                    --sms-selected-bg="#1b75bb"
                    --sms-selected-text-color="#ffffff"
                >
                    <div
                        slot="option"
                        class="p-1 w-full flex flex-row items-center gap-2"
                        let:idx
                        let:option
                    >
                        <div class="w-16 h-12 overflow-hidden rounded-sm shadow shrink-0">
                            <enhanced:img
                                src={themeImages[`/src/lib/img/bsecThemes/${option.img}`]}
                                alt=""
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <p
                            class="text-xs font-semibold flex-1 text-start"
                        >
                            {option.label}
                        </p>
                    </div>
                </MultiSelect>
            </div>
            <div class="flex flex-row gap-4 shrink-0">
                <h3 class="text-xs font-semibold uppercase text-gray-700">
                    Sort by:
                </h3>
                <div
                    class="flex flex-row flex-wrap gap-4"
                >
                    {#each sortTypes as s, i}
                        <button
                            onclick={() => setSort(i)}
                            class="
                                uppercase flex flex-row items-center text-xs font-light leading-tight 
                                text-link-blue cursor-pointer hover:underline hover:underline-offset-2
                            "
                        >
                            {s.name}
                            <Icon
                                icon={sortDescending ? 'solar:arrow-down-linear' : 'solar:arrow-up-linear'}
                                class={i===sortType ? 'text-link-blue' : 'text-white'}
                            />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <div
            class="flex flex-col gap-2 min-h-96"
        >
            <div class="w-full border-b border-solid border-gray-500"></div>
            {#each sortedData ?? [] as d, i}
                <a
                    target="_blank"
                    href={d.links.latest_html}
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
                            {d.ui.updated_date_l10n_long} ({d.ui.version})
                        </div>
                        <div
                            class="px-2 py-1 text-white bg-gray-500 font-semibold text-xs rounded"
                        >
                            {d.ui.resource_type.title_l10n}
                        </div>
                        <div
                            class="px-2 py-1 text-white bg-green-600 font-semibold text-xs rounded"
                        >
                            {d.ui.access_status.title_l10n}
                        </div>
                    </div>
                    <p class="font-semibold text-lg text-link-blue">
                        {d.metadata.title}
                    </p>
                    <p class="text-sm text-gray-500">
                        {d.ui.creators?.creators?.reduce((p, c) => `${p}${p ? ', ' : ''}${c.person_or_org.name}`, '')}
                    </p>
                    <p class="text-base line-clamp-3 mt-2">
                        {d.ui.description_stripped}
                    </p>
                    <div
                        class="flex flex-row gap-2 my-2"
                    >
                        {#each [...d.metadata.msdlive_sectors?.map(t=>t.sector) ?? [], ...d.metadata.msdlive_projects?.map(t=>t.name) ?? []] as tag}
                            <div
                                class="px-2 py-1 text-gray-700 bg-gray-300 font-semibold text-xs rounded"
                            >
                                {tag}
                            </div>
                        {/each}
                    </div>
                    <p class="text-xs text-gray-500">
                        Uploaded on {d.ui.created_date_l10n_long}
                    </p>
                </a>
            {/each}
        </div>
    </div>

</div>
