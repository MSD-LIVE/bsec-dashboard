<script>

    import SveltyPicker from "svelty-picker";

    let {
        startDate = $bindable(),
        endDate = $bindable(),
    } = $props();

</script>

<div class="w-full flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
    <div
        class="flex flex-row items-center gap-2"
    >
        <h3 class="text-xs font-semibold text-gray-700 py-2 w-36 text-end">
            START DATE:
        </h3>
        <div class="range-picker w-auto text-sm border border-gray-400 hover:border-blue-500 rounded-sm">
            <SveltyPicker
                required
                id='startDate'
                clearBtn={false}
                todayBtn={false}
                bind:value={startDate}
                startDate="2023-01-01"
                endDate="2024-12-31"
                mode="date"
                inputClasses="w-24 text-center cursor-pointer"
            />
        </div>
    </div>
    <div
        class="flex flex-row items-center gap-2"
    >
        <h3 class="text-xs font-semibold text-gray-700 py-2 text-end w-36 sm:w-auto">
            END DATE:
        </h3>
        <div class="range-picker w-auto text-sm border border-gray-400 hover:border-blue-500 rounded-sm">
            <SveltyPicker
                required
                id="endDate"
                clearBtn={false}
                todayBtn={false}
                bind:value={endDate}
                startDate="2023-01-01"
                endDate="2024-12-31"
                mode="date"
                inputClasses="w-24 text-center cursor-pointer"
            />
        </div>
    </div>
</div>
