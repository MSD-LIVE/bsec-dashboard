<script>

    import MultiSelect from 'svelte-multiselect'

    let {
        multi,
        multiVariables = $bindable([]),
        singleVariable = $bindable([]),
        options = [],
    } = $props();

</script>

<div
    class="w-full"
>
    <div
        class="flex flex-row w-full items-start gap-2"
    >
        <h3 class="text-xs font-semibold text-gray-700 py-2 w-36 text-end">
            PLOT VARIABLE{multi ? 'S' : ''}:
        </h3>
        <div class="md:min-w-72 max-w-[30rem]">
            {#if multi}
                <MultiSelect
                    bind:selected={multiVariables}
                    options={options}
                    maxSelect={5}
                    id="multiVariables"
                />
            {:else}
                <MultiSelect
                    bind:selected={singleVariable}
                    options={options}
                    maxSelect={1}
                    id="singleVariables"
                />
            {/if}
        </div>
    </div>
</div>
