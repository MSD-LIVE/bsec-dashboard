<script>

    import Icon from "@iconify/svelte";

    import StationMap from "$lib/components/StationMap.svelte";
    import TimeRangePicker from "$lib/components/TimeRangePicker.svelte";
    import StationChart from "$lib/components/StationChart.svelte";
    import VariablePicker from "$lib/components/VariablePicker.svelte";

    import AVAILABLE_VARIABLES from "$lib/dataVariables";

    const MAX_SELECTED = 6;

    let selectedStations = $state([]);

    let startDate = $state('2024-10-01');
    let   endDate = $state('2024-10-01');

    let multiVariables = $state(['Temperature - Average', 'Precipitation - Total', 'Pressure - Maximum']);
    let singleVariable = $state(['Temperature - Average']);

    let errorMessage = $state('');

    const toggleStation = (stationId) => {
        if (selectedStations.includes(stationId)) {
            selectedStations = selectedStations.filter(s => s !== stationId)
        }
        else {
            if (selectedStations.length < MAX_SELECTED) {
                selectedStations = [...selectedStations, stationId].sort();
            }
            else {
                errorMessage = `Please limit your selection to ${MAX_SELECTED} stations.`;
            }
        }
    }

    $effect(() => {
        if (errorMessage) {
            setTimeout(() => {
                errorMessage = '';
            }, 4000);
        }
    });

</script>

<div
    class="w-full h-auto min-h-screen flex flex-col items-stretch"
>
    <div
        class="w-full h-8 bg-rose-700 shadow flex items-center justify-center border-b border-b-black/5"
    >
        <p class="text-white text-sm">
            This is a demo site under active development. Please excuse any bugs!
        </p>
    </div>
    <div
        class="
            w-full h-auto flex-1 flex flex-col lg:flex-row items-stretch flex-wrap
        "
    >
        <div class="flex-1 w-full h-auto min-h-96 lg:min-h-[calc(100vh-2rem)] min-w-96 max-h-96 lg:max-h-none">
            <StationMap
                bind:selectedStations
                toggleStation={toggleStation}
            />
        </div>
        <div class="lg:max-w-[50%] w-full min-w-96 h-auto lg:min-h-[calc(100vh-2rem)] lg:shadow z-10 px-3 py-4 gap-2 flex flex-col items-center">
            <h2 class="text-xl font-medium">
                BSEC Weather Station Dashboard
            </h2>
            <div
                class="
                    h-4 flex flex-row items-center text-sm 
                    text-red-600 has-only:text-red-600/0
                    transition-colors has-only:duration-[2s] has-only:delay-2000 ease-out
                "
            >
                {#if errorMessage}
                    <span class="">
                        {errorMessage}
                    </span>
                {/if}
            </div>
            {#if selectedStations.length === 0}
                <div class="">
                    <span class="text-base">
                        Click one or more weather stations on the map to get started!
                    </span>
                </div>
            {:else}
                <div
                    class="flex flex-row w-full items-start gap-2"
                >
                    <h3 class="text-xs font-semibold text-gray-700 py-2 w-36 text-end">
                        SELECTED STATIONS:
                    </h3>
                    <div class="flex-1 flex flex-row flex-wrap gap-1">
                        {#each selectedStations as s}
                            <div class="px-2 py-1 rounded-lg bg-gray-200 shadow-sm flex flex-row items-center gap-1">
                                <span class="text-black font-medium">
                                    {s}
                                </span>
                                <button
                                    class="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
                                    onclick={() => toggleStation(s)}
                                >
                                    <Icon icon="proicons:cancel" />
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            {#if selectedStations.length > 0}
                <TimeRangePicker
                    bind:startDate
                    bind:endDate
                />
                <VariablePicker
                    multi={selectedStations.length === 1}
                    options={AVAILABLE_VARIABLES.map(v => v.display)}
                    bind:multiVariables
                    bind:singleVariable
                />
                <StationChart
                    availableVariables={AVAILABLE_VARIABLES}
                    {startDate}
                    {endDate}
                    {selectedStations}
                    {singleVariable}
                    {multiVariables}
                />
            {/if}
        </div>
    </div>
</div>