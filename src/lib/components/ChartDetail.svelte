<script>
    let {
        data = [],
        stations = [],
        variables = [],
        timeslice = undefined,
    } = $props();

    let dataByStation = $state();

    $effect(() => {
        if (timeslice && data.length && stations.length && variables.length) {
            const filteredData = data.filter(d => d.obsTimeUtc.getTime() === timeslice.getTime());
            dataByStation = stations.reduce((o, s) => ({
                ...o,
                [s]: filteredData.filter(d => d.stationID === s)[0],
            }), {});
        }
        else {
            dataByStation = undefined;
        }
    });

</script>

{#if (dataByStation && timeslice)}
    <div
        class="
            flex flex-col w-full p-2 gap-2
            bg-gray-100 rounded-lg shadow-sm
        "
    >
        <span class="mb-1 text-sm">
            {timeslice.toLocaleString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            })}
        </span>
        {#each stations as s}
            {#if dataByStation[s]}
                <div
                    class="flex flex-row px-2 gap-2 w-full"
                >
                    <h4 class="w-12 font-semibold text-sm">
                        {s}
                    </h4>
                    <div class="flex flex-col gap-2 w-full">
                        {#each variables as v}
                            <div class="flex flex-row px-2 text-sm gap-2">
                                <span class="w-24 text-end">
                                    {dataByStation[s][v.variable]} {v.units}
                                </span>
                                <span class="flex-1">
                                    {v.display}
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}