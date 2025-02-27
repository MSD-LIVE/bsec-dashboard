<script>
    import Icon from "@iconify/svelte";
    import { base } from '$app/paths';
    import bsecLogo from "$lib/img/bsec-logo.png";
    import devDataRecords from "$lib/data/dev_only_records.json";
    import DataDashboard from "$lib/components/Dashboard.svelte";
    import Statistics from "$lib/components/Statistics.svelte";
        
    const themeImages = import.meta.glob('$lib/img/bsecThemes/*.{jpg,jpeg,png}', {
        query: { enhanced: true, w: '100' },
        import: 'default',
        eager: true
    });

    const scienceThemes = [
        { name: 'Vegetation, Soils, and Ecosystems', img: 'theme0.jpg', },
        { name: 'Biogeochemistry', img: 'theme1.jpg', },
        // { name: 'Buildings and Energy', img: 'theme2.jpg', },
        { name: 'Meteorology', img: 'theme3.jpg', },
        { name: 'Water and Water Quality', img: 'theme6.jpg', },
        // { name: 'Health', img: 'theme8.jpg', },
        // { name: 'Air Quality', img: 'theme9.jpg', },
    ];

    let selectedThemes = $state([]);

    let data = $state();

    $effect(() => {
        if (data === undefined) {
            // TODO need to interact with the real API, but it is CORS protected
            data = devDataRecords;
        }
    });

    let filteredData = $derived(data?.hits?.hits?.filter(
        d => selectedThemes.length===0 ? true : d?.metadata?.msdlive_themes?.some(t => selectedThemes.includes(t.theme))
    ) ?? []);


    let featuredData = $derived(
        filteredData
            ? [
                ...filteredData.filter(d => d?.metadata?.title === 'Weather Data from BSEC Weather Stations').map(d => ({
                    ...d,
                    metadata: {
                        title: 'BSEC Weather Station Data'
                    },
                    icon: 'carbon:weather-station',
                })),
                {
                    metadata: {
                        title: 'BSEC Air Quality Data'
                    },
                    links: {
                        latest_html: ''
                    },
                    icon: 'mdi:air-filter',
                }
              ]
            : []
    );
    
</script>

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
        The Baltimore Social-Environmental Collaborative (BSEC) is a Department of Energy Urban Integrated Field Lab program designed to generate the science needed for informed energy investments and extreme weather resilience in Baltimore. In doing so, BSEC contributes to action plans for Baltimore that improve the well-being of residents across the region. Working with businesses, local and state government representatives, and community organizations, BSEC scientists produce the decision-relevant science needed to address local priorities and needs. As data is gathered and findings discovered, the work evolves to answer questions our partners identify.
    </p>

    <div class="flex flex-row flex-wrap min-w-96 gap-4">
        <div class="flex flex-col flex-1 gap-4">
            <div class="flex flex-row items-end gap-4 mt-2">
                <h2 class="text-lg font-semibold leading-none">
                    Featured Datasets
                </h2>
            </div>
            <div class="flex flex-col gap-4">
                {#each featuredData as d}
                    <a
                        href={d.links.latest_html}
                        class="
                            flex flex-row gap-2 items-center w-96 pr-2 rounded border border-solid border-gray-700
                            group
                        "
                        target=_blank
                        rel=noreferrer
                    >
                        <div class="p-2 bg-link-blue border-r border-r-gray-700">
                            <Icon
                                icon={d.icon}
                                class="text-2xl text-white"
                            />
                        </div>
                        <p class="text-link-blue font-semibold text-base line-clamp-1 group-hover:underline group-hover:underline-offset-2">
                            {d.metadata.title}
                        </p>
                        <Icon
                            icon='mdi:external-link'
                            class="text-lg text-link-blue ml-auto"
                        />
                    </a>
                {/each}
            </div>
        </div>
        <div class="flex flex-col flex-1 gap-2">
            <div class="flex flex-row items-end gap-4 mt-4">
                <h2 class="text-lg font-semibold leading-none">
                    Additional Resources
                </h2>
            </div>
            <div class="flex flex-col gap-1">
                <p class="flex flex-row items-center gap-1 whitespace-nowrap"><Icon icon="tabler:point" class="inline text-sm"/> <a
                    href="https://bsec.21cc.jhu.edu/"
                    class="text-link-blue hover:text-blue-900 underline underline-offset-2"
                    target="_blank"
                >BSEC Homepage</a> - Follow for news and updates from the BSEC team!
                </p>
                <p class="flex flex-row items-center gap-1 whitespace-nowrap"><Icon icon="tabler:point" class="inline text-sm"/> <a
                    href="https://www.arm.gov/"
                    class="text-link-blue hover:text-blue-900 underline underline-offset-2"
                    target="_blank"
                >ARM</a> - Atmospheric Radiation Measurement User Facility
                </p>
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

    <Statistics />

    <div class="flex flex-row items-end gap-4 mt-4">
        <h2 class="text-lg font-semibold leading-none">
            Science Themes
        </h2>
        <p class="text-xs font-light text-gray-700 leading-tight">
            Choose themes to filter available data products
        </p>
    </div>
    <div
        class="flex flex-row flex-wrap gap-4"
    >
        {#each scienceThemes as t, i}
            <button
                onclick={() => {
                    if (selectedThemes.includes(t.name)) {
                        selectedThemes = selectedThemes.filter(x => x!==t.name)
                    }
                    else {
                        selectedThemes = [...selectedThemes, t.name];
                    }
                }}
                class="
                    px-3 py-2 w-72 flex flex-row items-center gap-2
                    border border-solid border-gray-400 rounded-md shadow
                    cursor-pointer hover:ring-2 ring-blue-300 hover:border-blue-400
                "
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
                <div
                    class="
                        rounded-full w-9 h-9 border  flex items-center justify-center transition-colors duration-300
                        {selectedThemes.includes(t.name) ? 'border-green-600' : 'border-gray-300'}
                    "
                >
                    <Icon
                        icon='uit:check'
                        class="
                            text-4xl transition-colors duration-300
                            {selectedThemes.includes(t.name) ? 'text-green-600' : 'text-white'}
                        "
                    />
                </div>
            </button>
        {/each}
    </div>

    <div
        class="
            flex flex-col gap-2 flex-1 shrink-0 min-w-96 mt-4
        "
    >
        <div class="flex flex-row items-end gap-4">
            <h2 class="text-lg font-semibold leading-none">
                Data Products
            </h2>
            <p class="text-xs font-light text-gray-700 leading-tight">
                Showing {filteredData.length ?? 0} of {data?.hits?.hits?.length ?? 0} datasets
            </p>
        </div>
        <div
            class="flex flex-col gap-2 min-h-96"
        >
            {#each filteredData ?? [] as d, i}
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
