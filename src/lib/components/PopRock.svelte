<script>

    let {
        properties,
    } = $props();

    const keyToLabel = {
        'station_id'        : 'Station ID',
        'station_type'      : 'Type',
        'site_name'         : 'Site Name',
    }

</script>


<div class="flex flex-col gap-2 w-40">
    {#each Object.keys(keyToLabel) as k}
        {#if properties?.[k]}
            <div class="flex flex-col items-start">
                <p class="text-[0.67rem] whitespace-nowrap uppercase leading-none text-gray-300">
                    {keyToLabel[k]}
                </p>
                <p class="text-base leading-tight">
                    {properties?.[k]}
                </p>
            </div>
        {/if}
    {/each}
</div>
