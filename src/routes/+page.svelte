<script>
    import Icon from "@iconify/svelte";
    import { base } from '$app/paths';
    import bsecLogo from "$lib/img/bsec-logo.png";
    import devDataRecords from "$lib/data/dev_only_records.json";
    import DataDashboard from "$lib/components/Dashboard.svelte";
        
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

    <div class="flex flex-row items-end gap-4 mt-4">
        <h2 class="text-lg font-semibold leading-none">
            Statistics
        </h2>
        <p class="text-xs font-light text-gray-700 leading-tight">
            These numbers are just made up for now
        </p>
    </div>
    <div
        class="flex flex-row flex-wrap items-center justify-around gap-4"
    >
        <div class="flex flex-col items-center min-w-24 shrink-0">
            <span class="text-4xl font-semibold text-center">
                {data?.hits?.hits?.length ?? '-'}
            </span>
            <span class="text-lg text-gray-700 font-semibold text-center">
                Datasets
            </span>
        </div>
        <div class="flex flex-col items-center min-w-24 shrink-0">
            <span class="text-4xl font-semibold text-center">
                312
            </span>
            <span class="text-lg text-gray-700 font-semibold text-center">
                Downloads
            </span>
        </div>
        <div class="flex flex-col items-center min-w-24 shrink-0">
            <span class="text-4xl font-semibold text-center">
                21
            </span>
            <span class="text-lg text-gray-700 font-semibold text-center">
                Contributors
            </span>
        </div>
        <div class="flex flex-col items-center min-w-24 shrink-0">
            <span class="text-4xl font-semibold text-center">
                37.54
            </span>
            <span class="text-lg text-gray-700 font-semibold text-center">
                Gigabytes
            </span>
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
                    px-3 py-2 w-56 flex flex-row items-center gap-2
                    border border-solid border-gray-400 rounded-md shadow
                    cursor-pointer hover:ring-2 ring-blue-300 hover:border-blue-400
                "
                class:ring-blue-900={selectedThemes.includes(t.name)}
                class:ring-2={selectedThemes.includes(t.name)}
                class:border-transparent={selectedThemes.includes(t.name)}
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
